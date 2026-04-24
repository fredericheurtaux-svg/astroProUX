#!/usr/bin/env node

/**
 * Heavy SVG Optimizer
 * Optimise spécifiquement les SVG énormes
 */

import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';

const heavySVGs = [
  '/Users/fredericheurtaux/mon-site-pro/public/case-studies/Auchan 2.svg',
  '/Users/fredericheurtaux/mon-site-pro/public/case-studies/Kiabi 2.svg',
  '/Users/fredericheurtaux/mon-site-pro/public/case-studies/NOMAD 2-1.svg',
];

const svgoConfig = {
  plugins: [
    'preset-default',
    'removeStyleElement',
    'removeMetadata',
    'removeComments',
  ]
};

console.log('\n🎨 HEAVY SVG OPTIMIZATION\n');
console.log('='.repeat(70) + '\n');

for (const filePath of heavySVGs) {
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  ${path.basename(filePath)} - NOT FOUND`);
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const sizeBefore = Buffer.byteLength(content, 'utf8');

    // Optimiser
    const result = optimize(content, { path: filePath, ...svgoConfig });
    const sizeAfter = Buffer.byteLength(result.data, 'utf8');
    const reduction = Math.round(((sizeBefore - sizeAfter) / sizeBefore) * 100);

    // Sauvegarder
    fs.writeFileSync(filePath, result.data);

    const beforeMB = (sizeBefore / (1024 * 1024)).toFixed(2);
    const afterMB = (sizeAfter / (1024 * 1024)).toFixed(2);

    console.log(`✅ ${path.basename(filePath)}`);
    console.log(`   ${beforeMB}MB → ${afterMB}MB (-${reduction}%)\n`);
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)}: ${error.message}\n`);
  }
}

console.log('='.repeat(70) + '\n');
