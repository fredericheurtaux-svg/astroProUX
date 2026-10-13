import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import OpenAI from "openai";
import sharp from "sharp";

dotenv.config();

// ── Client space ──────────────────────────────────────────────────────────────
// Hardcoded credentials - to be replaced with DB authentication later
const CLIENT_USERS = [
  {
    username: "admin",
    password: process.env.CLIENT_PASSWORD_ADMIN || "Ux2026!admin",
    accessGrant: process.env.CLIENT_ACCESS_GRANT_ADMIN || "*",
  },
  {
    username: "client",
    password: process.env.CLIENT_PASSWORD_CLIENT || "Ux2026!client",
    accessGrant: process.env.CLIENT_ACCESS_GRANT_CLIENT || "client",
  },
];

// In-memory session store (lost on server restart, acceptable for now)
const clientSessions = new Map(); // token → { username, createdAt }

function parseGrantList(value) {
  return String(value || "")
    .split(";")
    .map((grant) => grant.trim().toLowerCase())
    .filter(Boolean);
}

function hasProjectAccess(clientUser, projectGrantsRaw) {
  const username = String(clientUser?.username || "").toLowerCase();
  if (username === "admin") {
    return true;
  }

  const userGrants = parseGrantList(clientUser?.accessGrant);
  if (userGrants.includes("*")) {
    return true;
  }

  const projectGrants = parseGrantList(projectGrantsRaw);
  if (projectGrants.length === 0) {
    return false;
  }

  return projectGrants.some((grant) => userGrants.includes(grant));
}

function toNullableNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function decodeBase64Text(value) {
  if (!value) {
    return "";
  }
  return Buffer.from(String(value), "base64").toString("utf8");
}

async function columnExists(tableName, columnName) {
  const sql = `
SELECT COUNT(*) AS column_count
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = ${sqlString(dbName)}
  AND TABLE_NAME = ${sqlString(tableName)}
  AND COLUMN_NAME = ${sqlString(columnName)};
`;

  const out = await runMariaDbSql(sql, { skipColumnNames: true });
  const count = Number(out.split(/\r?\n/).filter(Boolean)[0] || 0);
  return Number.isFinite(count) && count > 0;
}

function requireClientAuth(req, res, next) {
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !clientSessions.has(token)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }
  req.clientUser = clientSessions.get(token);
  return next();
}
// ─────────────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = Number(process.env.DB_PORT || 3306);
const dbSocket = process.env.DB_SOCKET || "";
const dbUser = process.env.DB_USER || "root";
const dbPassword =
  process.env.DB_PASSWORD ||
  process.env.MARIADB_ROOT_PASSWORD ||
  process.env.DB_ROOT_PASSWORD ||
  "";
const dbName = process.env.DB_NAME || "xc2yba_auditUX";
const openAiApiKey = String(process.env.OPENAI_API_KEY || "").trim();
const openAiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const openai = openAiApiKey
  ? new OpenAI({ apiKey: openAiApiKey })
  : null;

const distPath = path.join(__dirname, "dist");
const dataDir = path.join(__dirname, "data");
const availabilityFilePath = path.join(dataDir, "availability.json");
const availabilityTmpPath = path.join(dataDir, "availability.tmp.json");

function runMariaDbSql(sql, options = {}) {
  const args = ["--batch", "--raw", "-u", dbUser];

  if (dbSocket) {
    args.push(`--socket=${dbSocket}`);
  } else {
    args.push("-h", dbHost, "-P", String(dbPort));
  }

  if (dbPassword) {
    args.push(`-p${dbPassword}`);
  }

  if (options.skipColumnNames) {
    args.push("-N");
  }

  return new Promise((resolve, reject) => {
    const child = spawn("mariadb", args, { stdio: ["pipe", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });

    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || `mariadb exited with code ${code}`));
        return;
      }

      resolve(stdout.trim());
    });

    child.stdin.write(sql);
    child.stdin.end();
  });
}

function sqlString(value) {
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

function sqlNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error("Invalid numeric value");
  }
  return String(n);
}

function sqlNullableString(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }
  return sqlString(String(value));
}

function sqlNullableNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "NULL";
  }
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return "NULL";
  }
  return sqlNumber(n);
}

function guessMimeTypeFromPath(imagePath) {
  const lower = String(imagePath || "").toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

async function loadImageAsDataUrl(imagePath) {
  if (!imagePath) {
    throw new Error("Missing image path for capture");
  }

  const cleanPath = String(imagePath).startsWith("/")
    ? String(imagePath).slice(1)
    : String(imagePath);
  const absolutePath = path.join(__dirname, cleanPath);
  const buffer = await fs.readFile(absolutePath);
  const mimeType = guessMimeTypeFromPath(imagePath);

  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

async function cropImageToDataUrl(imagePath, zone) {
  if (!imagePath) {
    throw new Error("Missing image path for crop");
  }
  if (
    !zone ||
    typeof zone.x !== "number" ||
    typeof zone.y !== "number" ||
    typeof zone.width !== "number" ||
    typeof zone.height !== "number"
  ) {
    throw new Error("Invalid highlight zone for crop");
  }

  const cleanPath = String(imagePath).startsWith("/")
    ? String(imagePath).slice(1)
    : String(imagePath);
  const absolutePath = path.join(__dirname, cleanPath);

  const x = Math.max(0, Math.round(zone.x));
  const y = Math.max(0, Math.round(zone.y));
  const w = Math.max(1, Math.round(zone.width));
  const h = Math.max(1, Math.round(zone.height));

  const buffer = await sharp(absolutePath)
    .extract({ left: x, top: y, width: w, height: h })
    .png()
    .toBuffer();

  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function clampSeverity(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return null;
  }
  return Math.max(1, Math.min(4, Math.round(n)));
}

function normalizeConfidence(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "low" || normalized === "medium" || normalized === "high") {
    return normalized;
  }
  return "medium";
}

const AI_ENRICHMENT_REQUIRED_KEYS = [
  "description",
  "ai_suggested_heuristic_primary",
  "heuristic_primary_impact",
  "ai_suggested_heuristic_secondary",
  "heuristic_secondary_impact",
  "ai_suggested_severity",
  "ai_severity_rationale",
  "ai_accessibility_impact",
  "ai_recommendations",
  "issue_type",
  "suspected_ui_element",
  "ai_confidence_level",
];

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function validateAiEnrichmentRawPayload(payload) {
  if (!isPlainObject(payload)) {
    throw new Error("OpenAI JSON payload must be an object");
  }

  const keys = Object.keys(payload);

  for (const requiredKey of AI_ENRICHMENT_REQUIRED_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(payload, requiredKey)) {
      throw new Error(`OpenAI JSON payload missing key: ${requiredKey}`);
    }
  }

  for (const key of keys) {
    if (!AI_ENRICHMENT_REQUIRED_KEYS.includes(key)) {
      throw new Error(`OpenAI JSON payload has unexpected key: ${key}`);
    }
  }

  if (typeof payload.description !== "string") {
    throw new Error("Invalid type for description: expected string");
  }

  if (
    payload.ai_suggested_heuristic_primary !== null &&
    typeof payload.ai_suggested_heuristic_primary !== "string"
  ) {
    throw new Error(
      "Invalid type for ai_suggested_heuristic_primary: expected string or null"
    );
  }

  if (typeof payload.heuristic_primary_impact !== "string") {
    throw new Error("Invalid type for heuristic_primary_impact: expected string");
  }

  if (
    payload.ai_suggested_heuristic_secondary !== null &&
    typeof payload.ai_suggested_heuristic_secondary !== "string"
  ) {
    throw new Error(
      "Invalid type for ai_suggested_heuristic_secondary: expected string or null"
    );
  }

  if (typeof payload.heuristic_secondary_impact !== "string") {
    throw new Error("Invalid type for heuristic_secondary_impact: expected string");
  }

  if (
    typeof payload.ai_suggested_severity !== "number" ||
    !Number.isInteger(payload.ai_suggested_severity) ||
    payload.ai_suggested_severity < 1 ||
    payload.ai_suggested_severity > 4
  ) {
    throw new Error("Invalid value for ai_suggested_severity: expected integer 1..4");
  }

  if (typeof payload.ai_severity_rationale !== "string") {
    throw new Error("Invalid type for ai_severity_rationale: expected string");
  }

  if (typeof payload.ai_accessibility_impact !== "string") {
    throw new Error("Invalid type for ai_accessibility_impact: expected string");
  }

  if (typeof payload.ai_recommendations !== "string") {
    throw new Error("Invalid type for ai_recommendations: expected string");
  }

  if (typeof payload.issue_type !== "string") {
    throw new Error("Invalid type for issue_type: expected string");
  }

  if (typeof payload.suspected_ui_element !== "string") {
    throw new Error("Invalid type for suspected_ui_element: expected string");
  }

  if (
    typeof payload.ai_confidence_level !== "string" ||
    !["low", "medium", "high"].includes(payload.ai_confidence_level.trim().toLowerCase())
  ) {
    throw new Error(
      "Invalid value for ai_confidence_level: expected one of low|medium|high"
    );
  }
}

function normalizeAiEnrichmentPayload(payload, existingHeuristicPrimary) {
  const incomingPrimary =
    payload?.ai_suggested_heuristic_primary == null
      ? null
      : String(payload.ai_suggested_heuristic_primary).trim();

  let aiSuggestedPrimary = incomingPrimary;
  if (existingHeuristicPrimary) {
    const existing = String(existingHeuristicPrimary).trim();
    if (!incomingPrimary || incomingPrimary.toLowerCase() === existing.toLowerCase()) {
      aiSuggestedPrimary = null;
    }
  }

  return {
    description: String(payload?.description || "").trim(),
    ai_suggested_heuristic_primary: aiSuggestedPrimary || null,
    heuristic_primary_impact: String(payload?.heuristic_primary_impact || "").trim(),
    ai_suggested_heuristic_secondary:
      payload?.ai_suggested_heuristic_secondary == null
        ? null
        : String(payload.ai_suggested_heuristic_secondary).trim() || null,
    heuristic_secondary_impact: String(payload?.heuristic_secondary_impact || "").trim(),
    ai_suggested_severity: clampSeverity(payload?.ai_suggested_severity),
    ai_severity_rationale: String(payload?.ai_severity_rationale || "").trim(),
    ai_accessibility_impact: String(payload?.ai_accessibility_impact || "").trim(),
    ai_recommendations: String(payload?.ai_recommendations || "").trim(),
    issue_type: String(payload?.issue_type || "").trim(),
    suspected_ui_element: String(payload?.suspected_ui_element || "").trim(),
    ai_confidence_level: normalizeConfidence(payload?.ai_confidence_level),
  };
}

async function enrichFindingWithAI({ finding, capture, highlightZone }) {
  if (!openai) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const fullImageDataUrl = await loadImageAsDataUrl(capture.image_path);

  let cropDataUrl = null;
  if (highlightZone) {
    try {
      cropDataUrl = await cropImageToDataUrl(capture.image_path, highlightZone);
    } catch (err) {
      console.warn(
        `[enrich-ai] Crop failed, fallback to full image only: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  const systemPrompt = [
    "Tu es un expert senior en audit UX et ergonomie cognitive.",
    "Tu analyses des captures d'écran d'interfaces numériques pour identifier et qualifier des problèmes d'utilisabilité.",
    "Tu reçois une image complète de la page et, si disponible, un recadrage précis de la zone ciblée.",
    "Tu fournis une analyse précise, professionnelle et exploitable, adaptée à un rapport d'audit formel.",
    "Ton analyse de l'accessibilité reste prudente, non normative et orientée impact ressenti.",
    "Si heuristic_primary est déjà défini dans le finding, ne propose ai_suggested_heuristic_primary que si une alternative est réellement plus pertinente ; sinon retourne null.",
    "Réponds UNIQUEMENT en JSON valide et strict, sans texte additionnel, sans markdown, sans backticks.",
    "Respecte exactement le schéma fourni : toutes les clés sont obligatoires.",
    "Ne crée pas de clés supplémentaires.",
    "Valeurs autorisées pour ai_confidence_level : low | medium | high uniquement.",
    "Valeurs autorisées pour ai_suggested_severity : entier entre 1 et 4 uniquement.",
  ].join(" ");

  const zoneContext = highlightZone
    ? {
        x: highlightZone.x,
        y: highlightZone.y,
        width: highlightZone.width,
        height: highlightZone.height,
        note: cropDataUrl
          ? "Un recadrage de cette zone est fourni comme deuxième image. Concentre ton analyse sur cette zone."
          : "Aucun recadrage disponible. Localise visuellement cette zone sur l'image complète à partir des coordonnées.",
      }
    : null;

  const userPayload = {
    instructions:
      "Analyse ce finding UX à partir des informations textuelles et de(s) image(s) fournie(s). Retourne un objet JSON strictement conforme au schéma ci-dessous. Toutes les clés sont obligatoires.",
    schema: {
      description: "string — description précise et factuelle du problème observé",
      ai_suggested_heuristic_primary: "string (ex: H1, H3) ou null",
      heuristic_primary_impact: "string — explication de l'impact de la violation de l'heuristique principale",
      ai_suggested_heuristic_secondary: "string (ex: H1, H3) ou null",
      heuristic_secondary_impact: "string — explication de l'impact de la violation de l'heuristique secondaire",
      ai_suggested_severity: "integer — 1 (cosmétique) | 2 (mineur) | 3 (majeur) | 4 (critique)",
      ai_severity_rationale: "string — justification de la sévérité proposée",
      ai_accessibility_impact: "string — analyse prudente et non normative de l'impact sur l'accessibilité",
      ai_recommendations: "string — recommandations concrètes et exploitables",
      issue_type: "string — catégorie du problème ex: 'Feedback insuffisant', 'Affordance manquante', 'Surcharge cognitive'",
      suspected_ui_element: "string — élément UI concerné ex: 'Bouton', 'Formulaire', 'Navigation', 'Modal'",
      ai_confidence_level: "low | medium | high",
    },
    finding: {
      title: finding.title,
      description: finding.description,
      framework: finding.framework,
      heuristic_primary: finding.heuristic_primary || null,
      page_url: capture.page_url || null,
    },
    highlight_zone: zoneContext,
  };

  const userContent = [
    { type: "text", text: JSON.stringify(userPayload, null, 2) },
    { type: "image_url", image_url: { url: fullImageDataUrl } },
  ];

  if (cropDataUrl) {
    userContent.push({ type: "image_url", image_url: { url: cropDataUrl } });
  }

  const completion = await openai.chat.completions.create({
    model: openAiModel,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
  });

  const content = completion?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("OpenAI response is not valid JSON");
  }

  validateAiEnrichmentRawPayload(parsed);

  return normalizeAiEnrichmentPayload(parsed, finding.heuristic_primary);
}

function validateAuditPayload(item) {
  const hasBaseFields =
    item &&
    typeof item === "object" &&
    typeof item.page_url === "string" &&
    typeof item.page_title === "string" &&
    typeof item.image_width === "number" &&
    typeof item.image_height === "number" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    (typeof item.severity === "string" || typeof item.severity === "number") &&
    typeof item.heuristic === "string";

  const zone = item?.highlighted_zone ?? item?.highlight_zone;
  const hasValidZone =
    zone === undefined ||
    zone === null ||
    (typeof zone === "object" &&
      typeof zone.x === "number" &&
      typeof zone.y === "number" &&
      typeof zone.width === "number" &&
      typeof zone.height === "number");

  const screenshot = item?.screenshot_blob;
  const hasScreenshot =
    screenshot &&
    typeof screenshot === "object" &&
    typeof screenshot.mime_type === "string" &&
    typeof screenshot.filename === "string" &&
    typeof screenshot.base64 === "string";

  return hasBaseFields && hasValidZone && hasScreenshot;
}

async function ensureAuditSchema() {
  const sql = `
CREATE DATABASE IF NOT EXISTS \`${dbName}\`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE \`${dbName}\`;

CREATE TABLE IF NOT EXISTS projects (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  base_url VARCHAR(500) NOT NULL,
  description TEXT NULL,
  grants TEXT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_projects_base_url (base_url)
);

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS grants TEXT NULL DEFAULT NULL AFTER description;

ALTER TABLE projects
  MODIFY COLUMN grants TEXT NULL DEFAULT NULL;

CREATE TABLE IF NOT EXISTS captures (
  id INT NOT NULL AUTO_INCREMENT,
  page_url TEXT NOT NULL,
  page_title VARCHAR(500) NULL,
  image_path VARCHAR(1000) NOT NULL,
  image_width INT NULL,
  image_height INT NULL,
  highlight_zone JSON NULL,
  captured_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_captures_created_at (created_at)
);

ALTER TABLE captures
  ADD COLUMN IF NOT EXISTS highlight_zone JSON NULL AFTER image_height;

CREATE TABLE IF NOT EXISTS findings (
  id INT NOT NULL AUTO_INCREMENT,
  capture_id INT NOT NULL,
  project_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT NULL,
  severity INT NOT NULL,
  framework VARCHAR(100) NULL,
  heuristic_primary VARCHAR(255) NULL,
  heuristic_secondary VARCHAR(255) NULL,
  ai_suggested_heuristic_primary VARCHAR(255) NULL,
  ai_suggested_heuristic_secondary VARCHAR(255) NULL,
  heuristic_primary_impact TEXT NULL,
  heuristic_secondary_impact TEXT NULL,
  ai_suggested_severity INT NULL,
  ai_severity_rationale TEXT NULL,
  ai_accessibility_impact TEXT NULL,
  ai_recommendations TEXT NULL,
  ai_confidence_level VARCHAR(20) NULL,
  final_recommendations TEXT NULL,
  review_status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_findings_project_id (project_id),
  KEY idx_findings_capture_id (capture_id)
);

ALTER TABLE findings DROP COLUMN IF EXISTS idProject;

ALTER TABLE findings
  ADD COLUMN IF NOT EXISTS ai_suggested_heuristic_primary VARCHAR(255) NULL AFTER heuristic_secondary;

ALTER TABLE findings
  ADD COLUMN IF NOT EXISTS ai_suggested_heuristic_secondary VARCHAR(255) NULL AFTER ai_suggested_heuristic_primary;

ALTER TABLE findings
  ADD COLUMN IF NOT EXISTS ai_accessibility_impact TEXT NULL AFTER ai_severity_rationale;

ALTER TABLE findings
  ADD COLUMN IF NOT EXISTS ai_confidence_level VARCHAR(20) NULL AFTER ai_recommendations;

ALTER TABLE findings
  ADD COLUMN IF NOT EXISTS issue_type VARCHAR(255) NULL AFTER ai_confidence_level;

ALTER TABLE findings
  ADD COLUMN IF NOT EXISTS suspected_ui_element VARCHAR(255) NULL AFTER issue_type;

`;

  await runMariaDbSql(sql);

  const findingsHasProjectId = await columnExists("findings", "project_id");
  const capturesHasProjectId = await columnExists("captures", "project_id");

  if (!findingsHasProjectId) {
    await runMariaDbSql(`
USE \`${dbName}\`;
ALTER TABLE findings
  ADD COLUMN project_id INT NULL AFTER capture_id;
`);
  }

  if (capturesHasProjectId) {
    await runMariaDbSql(`
USE \`${dbName}\`;
UPDATE findings f
JOIN captures c ON c.id = f.capture_id
SET f.project_id = c.project_id
WHERE f.project_id IS NULL OR f.project_id = 0;
`);

    await runMariaDbSql(`
USE \`${dbName}\`;
ALTER TABLE captures DROP COLUMN project_id;
`);
  }

  await runMariaDbSql(`
USE \`${dbName}\`;
ALTER TABLE findings
  MODIFY COLUMN project_id INT NOT NULL;
`);

  try {
    await runMariaDbSql(`
USE \`${dbName}\`;
ALTER TABLE findings
  ADD CONSTRAINT fk_findings_projects
  FOREIGN KEY (project_id) REFERENCES projects(id)
  ON DELETE CASCADE ON UPDATE RESTRICT;
`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/Duplicate foreign key constraint name|already exists/i.test(message)) {
      throw error;
    }
  }
}

function severityToInt(severity) {
  if (typeof severity === "number") {
    return Math.max(1, Math.min(4, Math.round(severity)));
  }

  const map = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };

  return map[String(severity || "").toLowerCase()] || 2;
}

function getBaseUrl(pageUrl) {
  try {
    const parsed = new URL(pageUrl);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return "https://unknown.local";
  }
}

function extractDomainFromUrl(pageUrl) {
  try {
    const parsed = new URL(pageUrl);
    return String(parsed.hostname || "")
      .toLowerCase()
      .replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function findOrCreateProjectByUrl(pageUrl) {
  const forcedProjectId = Number(process.env.DB_PROJECT_ID || 0);
  if (Number.isFinite(forcedProjectId) && forcedProjectId > 0) {
    return forcedProjectId;
  }

  const domain = extractDomainFromUrl(pageUrl);
  const fallbackDomain = getBaseUrl(pageUrl).replace(/^https?:\/\//, "");
  const normalizedDomain = domain || fallbackDomain || "unknown.local";

  const searchSql = `
USE \`${dbName}\`;
SELECT id
FROM projects
WHERE LOWER(base_url) LIKE LOWER(${sqlString(`%${normalizedDomain}%`)})
LIMIT 1;
`;

  const searchOut = await runMariaDbSql(searchSql, { skipColumnNames: true });
  const existingId = Number(searchOut.split(/\r?\n/).filter(Boolean).pop());
  if (Number.isFinite(existingId) && existingId > 0) {
    return existingId;
  }

  const projectName = `Import ${normalizedDomain}`;
  const createSql = `
USE \`${dbName}\`;
INSERT INTO projects (name, base_url, description, grants, is_active)
VALUES (
  ${sqlString(projectName)},
  ${sqlString(normalizedDomain)},
  'Auto-generated private project for API imports',
  'admin',
  1
);
SELECT LAST_INSERT_ID();
`;

  const createOut = await runMariaDbSql(createSql, { skipColumnNames: true });
  const projectId = Number(createOut.split(/\r?\n/).filter(Boolean).pop());

  if (!Number.isFinite(projectId) || projectId <= 0) {
    throw new Error("Unable to resolve project_id");
  }

  return projectId;
}

async function saveScreenshotBlob(item) {
  const screenshot = item.screenshot_blob;
  const rawBase64 = String(screenshot.base64 || "");
  const cleanBase64 = rawBase64.includes(",") ? rawBase64.split(",").pop() : rawBase64;
  const buffer = Buffer.from(cleanBase64 || "", "base64");

  if (!buffer.length) {
    throw new Error("Invalid screenshot_blob.base64");
  }

  const safeFilename = String(screenshot.filename || "capture.bin").replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeFilename}`;
  const relativePath = path.join("data", "audit-captures", filename).replace(/\\/g, "/");
  const absolutePath = path.join(__dirname, relativePath);

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, buffer);

  return `/${relativePath}`;
}

async function insertAuditFinding(item) {
  const projectId = await findOrCreateProjectByUrl(item.page_url);
  const imagePath = await saveScreenshotBlob(item);
  const severity = severityToInt(item.severity);
  const zone = item.highlighted_zone ?? item.highlight_zone;

  const highlightZone = zone != null
    ? sqlString(JSON.stringify(zone))
    : "NULL";

  const captureSql = `
USE \`${dbName}\`;
INSERT INTO captures (
  page_url,
  page_title,
  image_path,
  image_width,
  image_height,
  highlight_zone,
  captured_at
) VALUES (
  ${sqlString(item.page_url)},
  ${sqlString(item.page_title)},
  ${sqlString(imagePath)},
  ${sqlNumber(item.image_width)},
  ${sqlNumber(item.image_height)},
  ${highlightZone},
  NOW()
);
SELECT LAST_INSERT_ID();
`;

  const captureOut = await runMariaDbSql(captureSql, { skipColumnNames: true });
  const captureId = Number(captureOut.split(/\r?\n/).pop());

  if (!Number.isFinite(captureId) || captureId <= 0) {
    throw new Error("Unable to insert capture row");
  }

  const sql = `
USE \`${dbName}\`;
INSERT INTO findings (
  capture_id,
  project_id,
  title,
  description,
  severity,
  framework,
  heuristic_primary,
  final_recommendations,
  review_status
) VALUES (
  ${sqlNumber(captureId)},
  ${sqlNumber(projectId)},
  ${sqlString(item.title)},
  ${sqlString(item.description)},
  ${sqlNumber(severity)},
  'nielsen_heuristics',
  ${sqlString(item.heuristic)},
  ${sqlString(`Screenshot: ${imagePath}`)},
  'draft'
);
SELECT LAST_INSERT_ID();
`;

  const out = await runMariaDbSql(sql, { skipColumnNames: true });
  const findingId = Number(out.split(/\r?\n/).pop());

  if (!Number.isFinite(findingId) || findingId <= 0) {
    throw new Error("Unable to insert finding row");
  }

  return { captureId, findingId, projectId };
}


app.use(express.json({ limit: "2mb" }));

// CORS for extension and local tools calling admin sync endpoints
app.use("/api/admin", (req, res, next) => {
  const origin = String(req.headers.origin || "");
  const isChromeExtension = origin.startsWith("chrome-extension://");
  const isLocalhost =
    /^https?:\/\/localhost(?::\d+)?$/i.test(origin) ||
    /^https?:\/\/127\.0\.0\.1(?::\d+)?$/i.test(origin);

  if (isChromeExtension || isLocalhost) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }

  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, x-sync-token");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.get("/data/availability.json", (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.sendFile(availabilityFilePath);
});

// Cache-Control headers middleware
app.use((req, res, next) => {
  // Assets with hash (immutable) - cache for 1 year
  if (req.url.match(/\/assets\/.*\.[a-f0-9]{8}\.(js|css)$/)) {
    res.set("Cache-Control", "public, max-age=31536000, immutable");
  }
  // Public assets (images, fonts, SVG, favicon, robots, etc) - cache for 30 days
  else if (req.url.match(/\.(jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot|ico|json)(\?.*)?$/i) || req.url.match(/\/(favicon|robots|sitemap)/i)) {
    res.set("Cache-Control", "public, max-age=2592000"); // 30 days
  }
  // Explicit HTML files and data API - never cache, always revalidate
  else if (req.url.match(/\.html(\?.*)?$/i) || req.url === '/' || req.url.match(/^\/api\/|^\/data\//)) {
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  // All other routes (SPA routes like /case-studies, /contact, /about, etc) - serve index.html with no-cache
  else {
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  next();
});

app.use(express.static(distPath, { index: false, redirect: false }));

// Fichiers de données publics
app.use("/data", express.static(dataDir));

const transporter = nodemailer.createTransport({
  host: "mail.infomaniak.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_USER,
    pass: process.env.EMAIL_PASS || process.env.SMTP_PASS,
  },
});

function isValidAvailability(payload) {
  return (
    payload &&
    typeof payload === "object" &&
    typeof payload.generatedAt === "string" &&
    typeof payload.timezone === "string" &&
    typeof payload.slotDurationMinutes === "number" &&
    payload.days &&
    typeof payload.days === "object"
  );
}

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, message, rendezvous, projectType } = req.body;
    console.log("Requête reçue:", req.body);
    if (!name || !email || !message) {
      console.log("Champs manquants dans la requête:", req.body);
      return res.status(400).json({ error: "Champs manquants" });
    }

    const emailIsValid =
      typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Ajoute le créneau dans le mail si fourni (compatibilité contact et appoitment)
    let rendezVousText = '';
    if (rendezvous) {
      rendezVousText = `\n\nCréneau choisi : ${rendezvous}`;
    } else if (message && /Créneau choisi :/.test(message)) {
      // Si déjà inclus dans le message, ne pas dupliquer
      rendezVousText = '';
    }

    // Ajoute le Type de ce projet dans le mail si fourni (compatibilité contact et appoitment)
    let projectTypeText = '';
    if (projectType) {
      projectTypeText = `\n\nType de projet : ${projectType}`;
    } else if (message && /Type de projet :/.test(message)) {
      // Si déjà inclus dans le message, ne pas dupliquer
      projectTypeText = '';
    }
 
    await transporter.sendMail({
      from: process.env.EMAIL_USER || process.env.SMTP_USER,
      to:
        process.env.MAIL_TO ||
        process.env.EMAIL_TO ||
        process.env.EMAIL_USER ||
        process.env.SMTP_USER,
      subject: `Message du SitePro de ${name}`,
      ...(emailIsValid ? { replyTo: email } : {}),
      text: `
Nom : ${name}
Email : ${email}
Téléphone : ${phone || "N/A"}
Entreprise : ${company || "N/A"}

Message :
${message}${rendezVousText}${projectTypeText}
      `,
    });

    res.json({ ok: true, message: "Mail envoyé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur envoi mail",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});


app.post("/api/admin/availability", async (req, res) => {
  try {
    const token = req.headers["x-sync-token"];
    console.log("Received    token:", token);
    console.log("Environment token:", process.env.AVAILABILITY_SYNC_TOKEN);
    
    
    if (!token || token !== process.env.AVAILABILITY_SYNC_TOKEN) {
      return res.status(401).json({ ok: false, error: "unauthorized" + (token ? ": invalid token" : ": missing token") });
    }

    const payload = req.body;

    if (!isValidAvailability(payload)) {
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    await fs.mkdir(dataDir, { recursive: true });

    const json = JSON.stringify(payload, null, 2);

    await fs.writeFile(availabilityTmpPath, json, "utf8");
    await fs.rename(availabilityTmpPath, availabilityFilePath);

    return res.json({
      ok: true,
      file: availabilityFilePath,
      generatedAt: payload.generatedAt,
    });
  } catch (error) {
    console.error("Erreur /api/admin/availability:", error);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.post("/api/admin/audit-import", async (req, res) => {
  try {
    const expectedToken =
      process.env.AUDIT_SYNC_TOKEN || process.env.AVAILABILITY_SYNC_TOKEN || "";
    const token = String(req.headers["x-sync-token"] || "");

    if (expectedToken && token !== expectedToken) {
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }

    if (!dbPassword) {
      return res.status(500).json({
        ok: false,
        error: "missing_db_password",
        message: "Configure DB_PASSWORD in .env",
      });
    }

    const items = Array.isArray(req.body)
      ? req.body
      : Array.isArray(req.body?.items)
      ? req.body.items
      : [req.body];

    if (items.length === 0) {
      return res.status(400).json({ ok: false, error: "empty_payload" });
    }

    const invalidIndex = items.findIndex((item) => !validateAuditPayload(item));
    if (invalidIndex !== -1) {
      return res.status(400).json({
        ok: false,
        error: "invalid_payload",
        index: invalidIndex,
      });
    }

    await ensureAuditSchema();

    const inserted = [];
    for (const item of items) {
      inserted.push(await insertAuditFinding(item));
    }

    return res.json({
      ok: true,
      database: dbName,
      tables: ["captures", "findings"],
      inserted: inserted.length,
      rows: inserted,
    });
  } catch (error) {
    console.error("Erreur /api/admin/audit-import:", error);
    return res.status(500).json({
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.get("/api/admin/audit-import", async (req, res) => {
  try {
    if (!dbPassword) {
      return res.status(500).json({
        ok: false,
        error: "missing_db_password",
        message: "Configure DB_PASSWORD in .env",
      });
    }

    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 200);

    await ensureAuditSchema();

    const sql = `
USE \`${dbName}\`;
SELECT
  f.id AS finding_id,
  c.id AS capture_id,
  p.id AS project_id,
  p.name AS project_name,
  c.page_url,
  c.page_title,
  c.image_path,
  f.title,
  f.severity,
  f.heuristic_primary,
  f.created_at
FROM findings f
JOIN captures c ON c.id = f.capture_id
JOIN projects p ON p.id = f.project_id
ORDER BY f.id DESC
LIMIT ${limit};
`;

    const out = await runMariaDbSql(sql, { skipColumnNames: true });
    const rows = out
      ? out
          .split(/\r?\n/)
          .filter(Boolean)
          .map((line) => {
            const [
              finding_id,
              capture_id,
              project_id,
              project_name,
              page_url,
              page_title,
              image_path,
              title,
              severity,
              heuristic_primary,
              created_at,
            ] = line.split("\t");
            return {
              finding_id: Number(finding_id),
              capture_id: Number(capture_id),
              project_id: Number(project_id),
              project_name,
              page_url,
              page_title,
              image_path,
              title,
              severity: Number(severity),
              heuristic_primary,
              created_at,
            };
          })
      : [];

    return res.json({ ok: true, count: rows.length, data: rows });
  } catch (error) {
    console.error("Erreur GET /api/admin/audit-import:", error);
    return res.status(500).json({
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// ── Client space API ──────────────────────────────────────────────────────────

app.post("/api/client/login", (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "");

  const match = CLIENT_USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!match) {
    return res.status(401).json({ ok: false, error: "invalid_credentials" });
  }

  const token = randomBytes(32).toString("hex");
  clientSessions.set(token, {
    username: match.username,
    accessGrant: match.accessGrant,
    createdAt: Date.now(),
  });

  return res.json({ ok: true, token, username: match.username });
});

app.get("/api/client/projects", requireClientAuth, async (req, res) => {
  try {
    await ensureAuditSchema();

    const sql = `
USE \`${dbName}\`;
SELECT
  p.id,
  p.name,
  p.base_url,
  p.grants,
  p.created_at,
  p.updated_at,
  COUNT(f.id) AS findings_count
FROM projects p
LEFT JOIN findings f ON f.project_id = p.id
WHERE p.is_active = 1
GROUP BY p.id, p.name, p.base_url, p.grants, p.created_at, p.updated_at
ORDER BY p.updated_at DESC;
`;

    const out = await runMariaDbSql(sql, { skipColumnNames: true });
    const rows = out
      ? out
          .split(/\r?\n/)
          .filter(Boolean)
          .map((line) => {
            const [
              id,
              name,
              base_url,
              grants,
              created_at,
              updated_at,
              findings_count,
            ] = line.split("\t");
            return {
              id: Number(id),
              name,
              base_url,
              grants,
              created_at,
              updated_at,
              findings_count: Number(findings_count),
            };
          })
      : [];

    const visibleRows = rows.filter((row) => hasProjectAccess(req.clientUser, row.grants));

    return res.json({ ok: true, data: visibleRows });
  } catch (error) {
    console.error("Erreur GET /api/client/projects:", error);
    return res.status(500).json({
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.get("/api/client/projects/:projectId/findings", requireClientAuth, async (req, res) => {
  try {
    await ensureAuditSchema();

    const projectId = Number(req.params.projectId);
    if (!Number.isFinite(projectId) || projectId <= 0) {
      return res.status(400).json({ ok: false, error: "invalid_project_id" });
    }

    const accessSql = `
USE \`${dbName}\`;
SELECT id, grants FROM projects WHERE id = ${sqlNumber(projectId)} AND is_active = 1 LIMIT 1;
`;
    const accessOut = await runMariaDbSql(accessSql, { skipColumnNames: true });
    const accessLine = accessOut.split(/\r?\n/).filter(Boolean)[0] || "";
    const [, projectGrants = ""] = accessLine ? accessLine.split("\t") : [];

    if (!accessLine) {
      return res.status(404).json({ ok: false, error: "project_not_found" });
    }

    if (!hasProjectAccess(req.clientUser, projectGrants)) {
      return res.status(403).json({ ok: false, error: "forbidden" });
    }

    const sql = `
USE \`${dbName}\`;
SELECT
  f.id,
  f.capture_id,
  f.project_id,
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.title, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.description, '')), '\n', ''), '\r', ''),
  f.severity,
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.framework, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_primary, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_secondary, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.ai_suggested_heuristic_primary, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.ai_suggested_heuristic_secondary, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_primary_impact, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_secondary_impact, '')), '\n', ''), '\r', ''),
  f.ai_suggested_severity,
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.ai_severity_rationale, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.ai_accessibility_impact, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.ai_recommendations, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.ai_confidence_level, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.issue_type, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.suspected_ui_element, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.final_recommendations, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.review_status, '')), '\n', ''), '\r', ''),
  f.created_at,
  f.updated_at,
  COALESCE(DATE_FORMAT(f.created_at, '%d/%m/%Y'), '') AS created_at_label,
  COALESCE(DATE_FORMAT(f.updated_at, '%d/%m/%Y'), '') AS updated_at_label,
  REPLACE(REPLACE(TO_BASE64(COALESCE(c.page_url, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(c.page_title, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(c.image_path, '')), '\n', ''), '\r', ''),
  c.image_width,
  c.image_height,
  REPLACE(REPLACE(TO_BASE64(COALESCE(CAST(c.highlight_zone AS CHAR), '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(p.name, '')), '\n', ''), '\r', '') AS project_name
FROM findings f
JOIN captures c ON c.id = f.capture_id
JOIN projects p ON p.id = f.project_id
WHERE f.project_id = ${sqlNumber(projectId)}
ORDER BY f.updated_at DESC, f.id DESC;
`;

    const out = await runMariaDbSql(sql, { skipColumnNames: true });
    const rows = out
      ? out
          .split(/\r?\n/)
          .filter(Boolean)
          .map((line) => {
            const [
              id,
              capture_id,
              project_id,
              title,
              description,
              severity,
              framework,
              heuristic_primary,
              heuristic_secondary,
              ai_suggested_heuristic_primary,
              ai_suggested_heuristic_secondary,
              heuristic_primary_impact,
              heuristic_secondary_impact,
              ai_suggested_severity,
              ai_severity_rationale,
              ai_accessibility_impact,
              ai_recommendations,
              ai_confidence_level,
              issue_type,
              suspected_ui_element,
              final_recommendations,
              review_status,
              created_at,
              updated_at,
              created_at_label,
              updated_at_label,
              page_url,
              page_title,
              image_path,
              image_width,
              image_height,
              highlight_zone,
              project_name,
            ] = line.split("\t");

            const highlightZoneText = decodeBase64Text(highlight_zone);
            let parsedHighlightZone = null;
            if (highlightZoneText && highlightZoneText.trim()) {
              try {
                parsedHighlightZone = JSON.parse(highlightZoneText);
              } catch {
                parsedHighlightZone = null;
              }
            }

            return {
              id: Number(id),
              capture_id: Number(capture_id),
              project_id: Number(project_id),
              title: decodeBase64Text(title),
              description: decodeBase64Text(description),
              severity: toNullableNumber(severity),
              framework: decodeBase64Text(framework),
              heuristic_primary: decodeBase64Text(heuristic_primary),
              heuristic_secondary: decodeBase64Text(heuristic_secondary),
              ai_suggested_heuristic_primary: decodeBase64Text(ai_suggested_heuristic_primary),
              ai_suggested_heuristic_secondary: decodeBase64Text(ai_suggested_heuristic_secondary),
              heuristic_primary_impact: decodeBase64Text(heuristic_primary_impact),
              heuristic_secondary_impact: decodeBase64Text(heuristic_secondary_impact),
              ai_suggested_severity: toNullableNumber(ai_suggested_severity),
              ai_severity_rationale: decodeBase64Text(ai_severity_rationale),
              ai_accessibility_impact: decodeBase64Text(ai_accessibility_impact),
              ai_recommendations: decodeBase64Text(ai_recommendations),
              ai_confidence_level: decodeBase64Text(ai_confidence_level),
              issue_type: decodeBase64Text(issue_type),
              suspected_ui_element: decodeBase64Text(suspected_ui_element),
              final_recommendations: decodeBase64Text(final_recommendations),
              review_status: decodeBase64Text(review_status),
              created_at,
              updated_at,
              created_at_label,
              updated_at_label,
              page_url: decodeBase64Text(page_url),
              page_title: decodeBase64Text(page_title),
              image_path: decodeBase64Text(image_path),
              image_width: toNullableNumber(image_width),
              image_height: toNullableNumber(image_height),
              highlight_zone: parsedHighlightZone,
              project_name: decodeBase64Text(project_name),
            };
          })
      : [];

    return res.json({ ok: true, data: rows });
  } catch (error) {
    console.error("Erreur GET /api/client/projects/:projectId/findings:", error);
    return res.status(500).json({
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.put("/api/client/findings/:findingId", requireClientAuth, async (req, res) => {
  try {
    await ensureAuditSchema();

    const findingId = Number(req.params.findingId);
    if (!Number.isFinite(findingId) || findingId <= 0) {
      return res.status(400).json({ ok: false, error: "invalid_finding_id" });
    }

    const findingSql = `
USE \`${dbName}\`;
SELECT
  f.id,
  f.project_id,
  p.grants
FROM findings f
JOIN projects p ON p.id = f.project_id
WHERE f.id = ${sqlNumber(findingId)}
LIMIT 1;
`;

    const findingOut = await runMariaDbSql(findingSql, { skipColumnNames: true });
    const findingLine = findingOut.split(/\r?\n/).filter(Boolean)[0] || "";
    if (!findingLine) {
      return res.status(404).json({ ok: false, error: "finding_not_found" });
    }

    const [, , projectGrants = ""] = findingLine.split("\t");
    if (!hasProjectAccess(req.clientUser, projectGrants)) {
      return res.status(403).json({ ok: false, error: "forbidden" });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const updatableFields = [
      "title",
      "description",
      "severity",
      "framework",
      "heuristic_primary",
      "heuristic_secondary",
      "ai_suggested_heuristic_primary",
      "ai_suggested_heuristic_secondary",
      "heuristic_primary_impact",
      "heuristic_secondary_impact",
      "ai_suggested_severity",
      "ai_severity_rationale",
      "ai_accessibility_impact",
      "ai_recommendations",
      "ai_confidence_level",
      "issue_type",
      "suspected_ui_element",
      "final_recommendations",
      "review_status",
    ];

    const updates = [];

    for (const field of updatableFields) {
      if (!Object.prototype.hasOwnProperty.call(body, field)) {
        continue;
      }

      const value = body[field];

      if (field === "severity" || field === "ai_suggested_severity") {
        if (value === null || value === undefined || value === "") {
          updates.push(`${field} = NULL`);
        } else {
          const n = Number(value);
          if (!Number.isFinite(n)) {
            return res.status(400).json({ ok: false, error: `invalid_${field}` });
          }
          updates.push(`${field} = ${sqlNumber(n)}`);
        }
      } else {
        const textValue = value === null || value === undefined ? "" : String(value);
        updates.push(`${field} = ${sqlString(textValue)}`);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ ok: false, error: "no_updatable_fields" });
    }

    const updateSql = `
USE \`${dbName}\`;
UPDATE findings
SET
  ${updates.join(",\n  ")},
  updated_at = CURRENT_TIMESTAMP
WHERE id = ${sqlNumber(findingId)};
`;

    await runMariaDbSql(updateSql, { skipColumnNames: true });
    return res.json({ ok: true });
  } catch (error) {
    console.error("Erreur PUT /api/client/findings/:findingId:", error);
    return res.status(500).json({
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.post("/api/audit/findings/:findingId/enrich-ai", requireClientAuth, async (req, res) => {
  try {
    await ensureAuditSchema();

    if (!openai) {
      return res.status(500).json({
        ok: false,
        error: "missing_openai_api_key",
        details: "Configure OPENAI_API_KEY dans .env puis redemarre le serveur Node.",
      });
    }

    const findingId = Number(req.params.findingId);
    if (!Number.isFinite(findingId) || findingId <= 0) {
      return res.status(400).json({ ok: false, error: "invalid_finding_id" });
    }

    const selectSql = `
USE \`${dbName}\`;
SELECT
  f.id,
  f.project_id,
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.title, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.description, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.framework, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_primary, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_secondary, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_primary_impact, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(f.heuristic_secondary_impact, '')), '\n', ''), '\r', ''),
  p.grants,
  c.id AS capture_id,
  REPLACE(REPLACE(TO_BASE64(COALESCE(c.page_url, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(c.image_path, '')), '\n', ''), '\r', ''),
  REPLACE(REPLACE(TO_BASE64(COALESCE(CAST(c.highlight_zone AS CHAR), '')), '\n', ''), '\r', '')
FROM findings f
JOIN projects p ON p.id = f.project_id
JOIN captures c ON c.id = f.capture_id
WHERE f.id = ${sqlNumber(findingId)}
LIMIT 1;
`;

    const out = await runMariaDbSql(selectSql, { skipColumnNames: true });
    const line = out.split(/\r?\n/).filter(Boolean)[0] || "";
    if (!line) {
      return res.status(404).json({ ok: false, error: "finding_not_found" });
    }

    const [
      id,
      project_id,
      title,
      description,
      framework,
      heuristic_primary,
      heuristic_secondary,
      heuristic_primary_impact,
      heuristic_secondary_impact,
      grants,
      capture_id,
      page_url,
      image_path,
      highlight_zone_raw,
    ] = line.split("\t");

    if (!hasProjectAccess(req.clientUser, grants)) {
      return res.status(403).json({ ok: false, error: "forbidden" });
    }

    let highlightZone = null;
    const highlightZoneText = decodeBase64Text(highlight_zone_raw);
    if (highlightZoneText && highlightZoneText.trim()) {
      try {
        highlightZone = JSON.parse(highlightZoneText);
      } catch {
        highlightZone = null;
      }
    }

    const finding = {
      id: Number(id),
      project_id: Number(project_id),
      title: decodeBase64Text(title),
      description: decodeBase64Text(description),
      framework: decodeBase64Text(framework),
      heuristic_primary: decodeBase64Text(heuristic_primary),
      heuristic_secondary: decodeBase64Text(heuristic_secondary),
      heuristic_primary_impact: decodeBase64Text(heuristic_primary_impact),
      heuristic_secondary_impact: decodeBase64Text(heuristic_secondary_impact),
    };

    const capture = {
      id: Number(capture_id),
      page_url: decodeBase64Text(page_url),
      image_path: decodeBase64Text(image_path),
    };

    const enrichment = await enrichFindingWithAI({ finding, capture, highlightZone });

    const updateSql = `
USE \`${dbName}\`;
UPDATE findings
SET
  description = ${sqlNullableString(enrichment.description || finding.description)},
  ai_suggested_heuristic_primary = ${sqlNullableString(
    enrichment.ai_suggested_heuristic_primary
  )},
  heuristic_primary_impact = ${sqlNullableString(enrichment.heuristic_primary_impact)},
  ai_suggested_heuristic_secondary = ${sqlNullableString(
    enrichment.ai_suggested_heuristic_secondary
  )},
  heuristic_secondary_impact = ${sqlNullableString(enrichment.heuristic_secondary_impact)},
  ai_suggested_severity = ${sqlNullableNumber(enrichment.ai_suggested_severity)},
  ai_severity_rationale = ${sqlNullableString(enrichment.ai_severity_rationale)},
  ai_accessibility_impact = ${sqlNullableString(enrichment.ai_accessibility_impact)},
  ai_recommendations = ${sqlNullableString(enrichment.ai_recommendations)},
  issue_type = ${sqlNullableString(enrichment.issue_type)},
  suspected_ui_element = ${sqlNullableString(enrichment.suspected_ui_element)},
  ai_confidence_level = ${sqlNullableString(enrichment.ai_confidence_level)},
  updated_at = CURRENT_TIMESTAMP
WHERE id = ${sqlNumber(findingId)};
`;

    await runMariaDbSql(updateSql, { skipColumnNames: true });

    return res.json({
      ok: true,
      findingId,
      projectId: finding.project_id,
      data: enrichment,
    });
  } catch (error) {
    console.error("Erreur POST /api/audit/findings/:findingId/enrich-ai:", error);
    return res.status(500).json({
      ok: false,
      error: "ai_enrichment_failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────

// ── SEO : robots.txt, sitemap.xml et balises par page ────────────────────────
const seoConfig = JSON.parse(await fs.readFile(path.join(__dirname, "src/app/seo.json"), "utf8"));
const SITE_URL = (process.env.SITE_URL || "https://frederic.heurtaux.me").replace(/\/$/, "");

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const normalizePath = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p) || "/";

function buildSeoBlock(pathname) {
  const page = seoConfig.pages[pathname];
  const meta = page || seoConfig.fallback;
  const noindex = !page;
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    noindex ? '<meta name="robots" content="noindex, nofollow" />' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    ...(noindex ? [] : [`<link rel="canonical" href="${url}" />`]),
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="fr_FR" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    '<meta name="twitter:card" content="summary" />',
  ].join("\n      ");
}

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
    ["User-agent: *", "Disallow: /client", "Disallow: /api", "", `Sitemap: ${SITE_URL}/sitemap.xml`, ""].join("\n")
  );
});

app.get("/sitemap.xml", (req, res) => {
  const urls = Object.keys(seoConfig.pages)
    .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc></url>`)
    .join("\n");
  res
    .type("application/xml")
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

// Catch-all React SPA : toujours tout à la fin
app.get("*", async (req, res) => {
  // Don't serve index.html for API routes that weren't matched above
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    const template = await fs.readFile(path.join(distPath, "index.html"), "utf8");
    const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, buildSeoBlock(normalizePath(req.path)));
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.type("html").send(html);
  } catch (err) {
    console.error('Error sending index.html:', err);
    res.status(500).send('Error loading page');
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server for heurtaux running on http://localhost:${port}`);
  console.log(`Serving static files from: ${distPath}`);
});