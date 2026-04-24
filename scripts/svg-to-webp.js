#!/usr/bin/env node

/**
 * Convertir les SVG énormes en WebP + fallback SVG
 * Utilise Puppeteer pour rendre SVG → PNG → WebP
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgFiles = [
  {
    input: '/Users/fredericheurtaux/mon-site-pro/public/case-studies/Auchan 2.svg',
    output: '/Users/fredericheurtaux/mon-site-pro/public/case-studies/Auchan-2.webp',
    width: 2380,
    height: 1684
  },
  {
    input: '/Users/fredericheurtaux/mon-site-pro/public/case-studies/Kiabi 2.svg',
    output: '/Users/fredericheurtaux/mon-site-pro/public/case-studies/Kiabi-2.webp',
    width: 2380,
    height: 1684
  }
];

console.log('\n🎨 SVG → WebP CONVERSION\n');
console.log('='.repeat(70) + '\n');

// Fonction pour convertir SVG en WebP via raster
async function convertSVGtoWebP(svgPath, webpPath, width, height) {
  try {
    if (!fs.existsSync(svgPath)) {
      console.log(`⏭️  ${path.basename(svgPath)} - NOT FOUND`);
      return;
    }

    // Lire le SVG
    const svgContent = fs.readFileSync(svgPath);

    // Convertir SVG → PNG rasterisé
    await sharp(svgContent, { 
      density: 150  // DPI pour meilleure qualité
    })
      .webp({ quality: 80 })
      .toFile(webpPath);

    const svgSize = fs.statSync(svgPath).size;
    const webpSize = fs.statSync(webpPath).size;
    const reduction = Math.round(((svgSize - webpSize) / svgSize) * 100);

    const svgMB = (svgSize / (1024 * 1024)).toFixed(2);
    const webpMB = (webpSize / (1024 * 1024)).toFixed(2);

    console.log(`✅ ${path.basename(webpPath)}`);
    console.log(`   ${svgMB}MB (SVG) → ${webpMB}MB (WebP) (-${reduction}%)\n`);
  } catch (error) {
    console.error(`❌ ${path.basename(svgPath)}: ${error.message}\n`);
  }
}

// Convertir tous les fichiers
(async () => {
  for (const file of svgFiles) {
    await convertSVGtoWebP(file.input, file.output, file.width, file.height);
  }

  console.log('='.repeat(70));
  console.log('\n💡 Utilisation dans components:');
  console.log(`
<picture>
  <source srcSet="/case-studies/Auchan-2.webp" type="image/webp" />
  <img src="/case-studies/Auchan 2.svg" alt="..." />
</picture>
  `);
  console.log('='.repeat(70) + '\n');
})();
