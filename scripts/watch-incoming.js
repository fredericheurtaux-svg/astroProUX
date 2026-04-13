import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INCOMING_DIR = path.join(__dirname, '../public/data/incoming');
const DATA_DIR = path.join(__dirname, '../public/data');

// Validation stricte du format availability
function isValidData(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if (typeof obj.generatedAt !== 'string') return false;
  if (typeof obj.timezone !== 'string') return false;
  if (typeof obj.slotDurationMinutes !== 'number') return false;
  if (!obj.days || typeof obj.days !== 'object') return false;
  for (const day of Object.values(obj.days)) {
    if (!day.slots || typeof day.slots !== 'object') return false;
    for (const status of Object.values(day.slots)) {
      if (status !== 'free' && status !== 'busy') return false;
    }
  }
  return true;
}

function processFile(filename) {
  const srcPath = path.join(INCOMING_DIR, filename);
  const destPath = path.join(DATA_DIR, filename);
  if (!filename.endsWith('.json')) return;
  fs.readFile(srcPath, 'utf8', (err, data) => {
    if (err) return;
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      console.error(`[watch-incoming] Fichier JSON invalide ignoré: ${filename}`);
      return;
    }
    if (!isValidData(parsed)) {
      console.error(`[watch-incoming] Format incorrect pour: ${filename}`);
      return;
    }
    // Nouveau nom basé sur generatedAt
    let newName = "availability.json";
 
    const destPath = path.join(DATA_DIR, newName);
    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error(`[watch-incoming] Erreur copie: ${filename}`, err);
      } else {
        fs.unlink(srcPath, (err) => {
          if (err) {
            console.error(`[watch-incoming] Erreur suppression: ${filename}`, err);
          } else {
            console.log(`[watch-incoming] Fichier validé, copié et supprimé: ${newName}`);
          }
        });
      }
    });
  });
}

fs.watch(INCOMING_DIR, (eventType, filename) => {
  if (filename && eventType === 'rename') {
    // Un fichier ajouté ou renommé
    setTimeout(() => processFile(filename), 200); // délai pour éviter lecture incomplète
  }
});

console.log('[watch-incoming] Surveillance du dossier incoming lancée...');
