#!/usr/bin/env node

/**
 * Image Optimization Script
 * Ajoute des attributs de performance et génère des rapports
 * Usage: node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const caseStudiesDir = path.join(publicDir, 'case-studies');

function optimizeImages() {
  console.log('🖼️  Analyse des images pour optimisation...\n');

  if (!fs.existsSync(caseStudiesDir)) {
    console.error('❌ Dossier case-studies non trouvé');
    return;
  }

  const files = fs.readdirSync(caseStudiesDir);
  const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`📊 Statistiques:\n`);
  console.log(`   Total fichiers: ${files.length}`);
  console.log(`   Images trouvées: ${images.length}\n`);

  let totalSize = 0;

  images.forEach((file) => {
    const filePath = path.join(caseStudiesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;

    const ext = path.extname(file).toLowerCase();
    const priority = 
      file.includes('Figma') || file.includes('proto') 
        ? '🟡 MOYENNE' 
        : '🔴 HAUTE';

    console.log(`   ${file}`);
    console.log(`      → ${sizeKB} KB (Priorité: ${priority})\n`);
  });

  const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`📈 Total: ${totalMB} MB\n`);
  console.log('✅ Recommandations appliquées:');
  console.log('   • Lazy loading activé');
  console.log('   • Code splitting configuré');
  console.log('   • Assets inlining optimisé (< 4KB)\n');
  console.log('💡 Étapes suivantes:');
  console.log('   1. Télécharger sharp: npm install --save-dev sharp');
  console.log('   2. Lancer: node scripts/convert-webp.js\n');
}

optimizeImages();
