#!/usr/bin/env node

/**
 * WebP Conversion Script
 * Convertit les PNG/JPG en WebP avec fallback
 * Usage: node scripts/convert-webp.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const caseStudiesDir = path.join(__dirname, '../public/case-studies');

const WEBP_QUALITY = {
  png: { quality: 80 },
  jpeg: { quality: 75, progressive: true }
};

async function convertImages() {
  console.log('🔄 Conversion en WebP...\n');

  if (!fs.existsSync(caseStudiesDir)) {
    console.error('❌ Dossier case-studies non trouvé');
    return;
  }

  const files = fs.readdirSync(caseStudiesDir);
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  let savedBytes = 0;
  let convertedCount = 0;

  for (const file of images) {
    const filePath = path.join(caseStudiesDir, file);
    const webpPath = path.join(caseStudiesDir, `${path.parse(file).name}.webp`);

    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  ${file} → ${path.basename(webpPath)} (déjà existant)`);
      continue;
    }

    try {
      const originalSize = fs.statSync(filePath).size;
      const ext = path.extname(file).toLowerCase();
      const options = ext === '.png' ? WEBP_QUALITY.png : WEBP_QUALITY.jpeg;

      await sharp(filePath)
        .webp(options)
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size;
      const reduction = Math.round(((originalSize - webpSize) / originalSize) * 100);
      savedBytes += originalSize - webpSize;

      console.log(`✅ ${file}`);
      console.log(`   ${(originalSize / 1024).toFixed(0)}KB → ${(webpSize / 1024).toFixed(0)}KB (-${reduction}%)\n`);
      convertedCount++;
    } catch (error) {
      console.error(`❌ Erreur: ${file} - ${error.message}\n`);
    }
  }

  const savedMB = (savedBytes / (1024 * 1024)).toFixed(2);
  console.log('\n📊 Résumé:');
  console.log(`   Convertis: ${convertedCount}/${images.length}`);
  console.log(`   Espace économisé: ${savedMB} MB\n`);

  console.log('💡 Utilisation dans les composants:');
  console.log(`   <picture>`);
  console.log(`     <source srcSet="/case-studies/image.webp" type="image/webp" />`);
  console.log(`     <img src="/case-studies/image.png" alt="..." />`);
  console.log(`   </picture>\n`);
}

convertImages().catch(console.error);
