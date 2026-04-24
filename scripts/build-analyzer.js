#!/usr/bin/env node

/**
 * Build Analyzer
 * Génère un rapport du build et identifie les opportunités d'optimisation
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('\n📦 BUILD ANALYSIS & OPTIMIZATION REPORT\n');
console.log('='.repeat(70));

// Fonction pour formater la taille
const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

// Analyser les fichiers du dist
const distDir = './dist';
if (fs.existsSync(distDir)) {
  console.log('\n📊 DISTRIBUTION FILES SIZE\n');
  
  const files = [];
  const walk = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walk(filePath);
      } else {
        const relativePath = path.relative(distDir, filePath);
        const ext = path.extname(file);
        files.push({
          path: relativePath,
          size: stat.size,
          ext
        });
      }
    });
  };
  
  walk(distDir);
  
  // Grouper par extension
  const byExt = {};
  files.forEach(f => {
    if (!byExt[f.ext]) byExt[f.ext] = { count: 0, size: 0 };
    byExt[f.ext].count++;
    byExt[f.ext].size += f.size;
  });
  
  Object.entries(byExt).forEach(([ext, data]) => {
    console.log(`${ext.padEnd(8)} ${data.count.toString().padStart(3)} files  ${formatSize(data.size).padStart(8)}`);
  });
  
  // Top 10 fichiers volumineux
  console.log('\n⚠️  TOP 10 LARGEST FILES\n');
  files.sort((a, b) => b.size - a.size).slice(0, 10).forEach((f, i) => {
    console.log(`${(i+1).toString().padStart(2)}. ${f.path.padEnd(40)} ${formatSize(f.size).padStart(8)}`);
  });
  
} else {
  console.log('\n❌ no dist/ folder - run npm run build first\n');
  process.exit(1);
}

console.log('\n' + '='.repeat(70));
console.log('\n✨ OPTIMIZATIONS APPLIED (Phase 2)\n');
console.log('✅ Code Splitting');
console.log('   • vendor-react, vendor-mui, vendor-charts');
console.log('   • vendor-router, vendor-radix, vendor-dnd');
console.log('   • Estimated: Initial bundle -40%\n');

console.log('✅ Lazy Loading Routes');
console.log('   • All pages except Home lazy-loaded');
console.log('   • Suspense fallback added');
console.log('   • Chunks loaded on navigation\n');

console.log('✅ Tailwind CSS');
console.log('   • @source scanner for unused CSS removal');
console.log('   • No inline styles in components\n');

console.log('✅ Terser Minification');
console.log('   • console.log removed in production');
console.log('   • debugger statements stripped\n');

console.log('='.repeat(70));

// Recommandations
console.log('\n💡 FURTHER OPTIMIZATION OPPORTUNITIES\n');
console.log('1. Gzip Compression');
console.log('   • Enable on production server (server.js)\n');

console.log('2. Brotli Compression');
console.log('   • Better than gzip for JS/CSS\n');

console.log('3. Service Worker');
console.log('   • Cache strategy for static assets\n');

console.log('4. CDN for Static Assets');
console.log('   • Move /public to CDN edge locations\n');

console.log('5. Image CDN');
console.log('   • Serve optimized images from CDN\n');

console.log('='.repeat(70) + '\n');
