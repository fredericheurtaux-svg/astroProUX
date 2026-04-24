#!/usr/bin/env node

/**
 * Bundle Size Analyzer
 * Estime la taille du bundle avant/après optimisations
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const deps = packageJson.dependencies;

// Dépendances lourdes à optimiser (estimations en KB)
const heavyDeps = {
  '@mui/material': { size: 280, type: '🔴 UI Framework' },
  '@emotion/react': { size: 85, type: '🔴 Styling' },
  '@emotion/styled': { size: 15, type: '🔴 Styling' },
  'recharts': { size: 150, type: '🟡 Charts' },
  'react-dnd': { size: 45, type: '🟡 DnD' },
  'react-dnd-html5-backend': { size: 12, type: '🟡 DnD' },
  'react-slick': { size: 85, type: '🟡 Carousel' },
  'embla-carousel-react': { size: 25, type: '🟡 Carousel' },
  '@radix-ui/react-tabs': { size: 8, type: '🟢 Radix' },
  '@radix-ui/react-select': { size: 15, type: '🟢 Radix' },
  '@radix-ui/react-dialog': { size: 12, type: '🟢 Radix' },
  '@popperjs/core': { size: 18, type: '🟢 Popper' },
  'react-router': { size: 55, type: '🟡 Router' },
};

console.log('\n📦 BUNDLE ANALYSIS\n');
console.log('='.repeat(60));

let totalHeavy = 0;
const criticalPath = [];

Object.entries(heavyDeps).forEach(([pkg, { size, type }]) => {
  if (deps[pkg]) {
    totalHeavy += size;
    console.log(`${type} ${pkg.padEnd(30)} ~${size}KB`);
    
    if (size > 40) {
      criticalPath.push({ pkg, size });
    }
  }
});

console.log('='.repeat(60));
console.log(`Total dépendances lourdes: ~${totalHeavy}KB\n`);

console.log('⚡ OPTIMISATIONS RECOMMANDÉES\n');

console.log('1️⃣  CODE SPLITTING (Haute Priorité)');
criticalPath.forEach(({ pkg, size }) => {
  console.log(`   • ${pkg} (${size}KB) → chunk séparé`);
});

console.log('\n2️⃣  LAZY LOADING (Routes)');
console.log('   • CaseStudies → lazy load');
console.log('   • Contact → lazy load');
console.log('   • Services → lazy load');
console.log('   • Appointment → lazy load');

console.log('\n3️⃣  TAILWIND CSS');
console.log('   ✓ Purge unused classes');
console.log('   ✓ CSS minification en prod');
console.log('   ✓ Optimiser theme.css');

console.log('\n4️⃣  DEFER SCRIPTS');
console.log('   • Analytics → defer');
console.log('   • Non-critical JS → async');
console.log('   • Service Worker → async');

console.log('\n📊 IMPACT ESTIMÉ');
console.log('='.repeat(60));
console.log('Sans optimisations: ~450KB initial + 150KB lazy');
console.log('Avec Phase 2:       ~280KB initial + 170KB lazy (40% gain)');
console.log('='.repeat(60) + '\n');

console.log('💡 Prochaines étapes:');
console.log('   1. npm run build:analyze');
console.log('   2. Configurer rollupOptions manualChunks');
console.log('   3. Ajouter lazy loading routes');
console.log('   4. Vérifier build output\n');
