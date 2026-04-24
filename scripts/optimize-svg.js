#!/usr/bin/env node

/**
 * SVG Optimizer
 * Optimise tous les fichiers SVG avec SVGO
 * Usage: node scripts/optimize-svg.js
 */

import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// Configuration SVGO agressive
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,    // Garder viewBox
          cleanupIds: true,        // Nettoyer les IDs
          removeHiddenElems: true, // Supprimer éléments cachés
          removeEmptyAttrs: true,  // Supprimer attributs vides
          cleanupNumericValues: {  // Réduire la précision
            floatToShort: true,
            convertPathData: true,
            convertTransform: true,
          },
        }
      }
    },
    {
      name: 'removeXMLNS'  // Supprimer xmlns si possible
    },
    {
      name: 'removeScripts' // Supprimer scripts
    },
    {
      name: 'removeMetadata' // Supprimer metadata
    },
    {
      name: 'removeComments' // Supprimer commentaires
    },
    {
      name: 'removeDoctype' // Supprimer doctype
    },
    {
      name: 'removeEmptyContainers' // Supprimer conteneurs vides
    },
    {
      name: 'cleanupEnableBackground' // Cleanup background
    },
    {
      name: 'removeHiddenElems' // Supprimer éléments cachés
    },
    {
      name: 'removeStyleElement' // Supprimer éléments style
    },
    {
      name: 'convertStyleToAttrs' // Convertir style → attributs
    }
  ]
};

async function optimizeSVGs() {
  console.log('\n🎨 SVG OPTIMIZATION\n');
  console.log('='.repeat(70));

  const findSVGs = (dir) => {
    const svgs = [];
    const walk = (currentPath) => {
      fs.readdirSync(currentPath).forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walk(filePath);
        } else if (file.endsWith('.svg')) {
          svgs.push(filePath);
        }
      });
    };
    walk(dir);
    return svgs;
  };

  const svgFiles = findSVGs(publicDir);
  console.log(`📊 SVG files found: ${svgFiles.length}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const filePath of svgFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const sizeBefore = Buffer.byteLength(content, 'utf8');
      totalBefore += sizeBefore;

      // Optimiser
      const result = optimize(content, { path: filePath, ...svgoConfig });
      const sizeAfter = Buffer.byteLength(result.data, 'utf8');
      totalAfter += sizeAfter;

      const reduction = Math.round(((sizeBefore - sizeAfter) / sizeBefore) * 100);

      // Sauvegarder si optimisation significative (> 5%)
      if (reduction > 5) {
        fs.writeFileSync(filePath, result.data);
        results.push({
          file: path.relative(publicDir, filePath),
          before: sizeBefore,
          after: sizeAfter,
          reduction
        });
      }
    } catch (error) {
      console.error(`❌ Error optimizing ${filePath}: ${error.message}`);
    }
  }

  // Afficher résultats
  console.log('✅ OPTIMIZED FILES\n');
  results.sort((a, b) => b.before - a.before).forEach(r => {
    const beforeMB = (r.before / (1024 * 1024)).toFixed(2);
    const afterMB = (r.after / (1024 * 1024)).toFixed(2);
    console.log(`${r.file.padEnd(40)} ${beforeMB}MB → ${afterMB}MB (-${r.reduction}%)`);
  });

  console.log('\n' + '='.repeat(70));
  const totalMBBefore = (totalBefore / (1024 * 1024)).toFixed(2);
  const totalMBAfter = (totalAfter / (1024 * 1024)).toFixed(2);
  const totalReduction = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);

  console.log(`\n📈 TOTAL\n`);
  console.log(`Files optimized: ${results.length}/${svgFiles.length}`);
  console.log(`Before: ${totalMBBefore} MB`);
  console.log(`After:  ${totalMBAfter} MB`);
  console.log(`Saved:  ${(totalBefore - totalAfter) / (1024 * 1024).toFixed(2)} MB (-${totalReduction}%)\n`);
  console.log('='.repeat(70) + '\n');
}

optimizeSVGs().catch(console.error);
