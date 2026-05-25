import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import { spawn } from "node:child_process";

dotenv.config();

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

  const zone = item?.highlighted_zone;
  const hasZone =
    zone &&
    typeof zone === "object" &&
    typeof zone.x === "number" &&
    typeof zone.y === "number" &&
    typeof zone.width === "number" &&
    typeof zone.height === "number";

  const screenshot = item?.screenshot_blob;
  const hasScreenshot =
    screenshot &&
    typeof screenshot === "object" &&
    typeof screenshot.mime_type === "string" &&
    typeof screenshot.filename === "string" &&
    typeof screenshot.base64 === "string";

  return hasBaseFields && hasZone && hasScreenshot;
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
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_projects_base_url (base_url)
);

CREATE TABLE IF NOT EXISTS captures (
  id INT NOT NULL AUTO_INCREMENT,
  project_id INT NOT NULL,
  page_url TEXT NOT NULL,
  page_title VARCHAR(500) NULL,
  image_path VARCHAR(1000) NOT NULL,
  image_width INT NULL,
  image_height INT NULL,
  captured_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_captures_project_id (project_id)
);

CREATE TABLE IF NOT EXISTS findings (
  id INT NOT NULL AUTO_INCREMENT,
  capture_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT NULL,
  severity INT NOT NULL,
  framework VARCHAR(100) NULL,
  heuristic_primary VARCHAR(255) NULL,
  heuristic_secondary VARCHAR(255) NULL,
  heuristic_primary_impact TEXT NULL,
  heuristic_secondary_impact TEXT NULL,
  ai_suggested_severity INT NULL,
  ai_severity_rationale TEXT NULL,
  ai_recommendations TEXT NULL,
  final_recommendations TEXT NULL,
  review_status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_findings_capture_id (capture_id)
);
`;

  await runMariaDbSql(sql);
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

async function ensureProjectId(item) {
  const forcedProjectId = Number(process.env.DB_PROJECT_ID || 0);
  if (Number.isFinite(forcedProjectId) && forcedProjectId > 0) {
    return forcedProjectId;
  }

  const baseUrl = getBaseUrl(item.page_url);
  const projectName = `Import ${baseUrl.replace(/^https?:\/\//, "")}`;

  const sql = `
USE \`${dbName}\`;
INSERT INTO projects (name, base_url, description, is_active)
VALUES (
  ${sqlString(projectName)},
  ${sqlString(baseUrl)},
  'Auto-generated project for API imports',
  1
)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

SELECT id FROM projects WHERE base_url = ${sqlString(baseUrl)} LIMIT 1;
`;

  const out = await runMariaDbSql(sql, { skipColumnNames: true });
  const projectId = Number(out.split(/\r?\n/).pop());

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
  const projectId = await ensureProjectId(item);
  const imagePath = await saveScreenshotBlob(item);
  const severity = severityToInt(item.severity);
  const zoneDetails = `highlighted_zone=${JSON.stringify(item.highlighted_zone)}`;

  const captureSql = `
USE \`${dbName}\`;
INSERT INTO captures (
  project_id,
  page_url,
  page_title,
  image_path,
  image_width,
  image_height,
  captured_at
) VALUES (
  ${sqlNumber(projectId)},
  ${sqlString(item.page_url)},
  ${sqlString(item.page_title)},
  ${sqlString(imagePath)},
  ${sqlNumber(item.image_width)},
  ${sqlNumber(item.image_height)},
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
  title,
  description,
  severity,
  framework,
  heuristic_primary,
  final_recommendations,
  review_status
) VALUES (
  ${sqlNumber(captureId)},
  ${sqlString(item.title)},
  ${sqlString(`${item.description}\n\n${zoneDetails}`)},
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

  return { captureId, findingId };
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

app.use(express.static(distPath));

// Fichiers de données publics
//app.use("/data", express.static(dataDir));

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
JOIN projects p ON p.id = c.project_id
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

// Catch-all React SPA : toujours tout à la fin
app.get("*", (req, res) => {
  // Don't serve index.html for API routes that weren't matched above
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  // Serve index.html for all other routes (SPA routing with no-cache headers)
  res.set("Cache-Control", "public, max-age=0, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading page');
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server for heurtaux running on http://localhost:${port}`);
  console.log(`Serving static files from: ${distPath}`);
});