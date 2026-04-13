import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "node:fs/promises";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

const distPath = path.join(__dirname, "dist");
const dataDir = path.join(__dirname, "data");
const availabilityFilePath = path.join(dataDir, "availability.json");
const availabilityTmpPath = path.join(dataDir, "availability.tmp.json");



app.use(express.json({ limit: "2mb" }));

app.get("/data/availability.json", (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.sendFile(availabilityFilePath);
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

    // Ajoute le Type de projet dans le mail si fourni (compatibilité contact et appoitment)
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
    // console.log("Received    token:", token);
    // console.log("Environment token:", process.env.AVAILABILITY_SYNC_TOKEN);
    
    
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

// Catch-all React SPA : toujours tout à la fin
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});