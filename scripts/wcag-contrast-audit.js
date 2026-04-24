#!/usr/bin/env node

/**
 * WCAG Contrast Audit
 * Vérifie que tous les contrastes respectent WCAG 2.1 AA (4.5:1)
 * Basé sur les variables CSS du theme
 */

// Fonction pour convertir oklch → RGB (approximation)
function oklchToRgb(o, l, c, h) {
  const l_ = l + 0.3963277541 * c * Math.cos((h * Math.PI) / 180) + 0.2158037573 * c * Math.sin((h * Math.PI) / 180);
  const m_ = l - 0.1055613458 * c * Math.cos((h * Math.PI) / 180) - 0.0638541728 * c * Math.sin((h * Math.PI) / 180);
  const s_ = l - 0.3654652023 * c * Math.cos((h * Math.PI) / 180) + 0.4418770323 * c * Math.sin((h * Math.PI) / 180);

  const l2 = l_ * l_ * l_;
  const m2 = m_ * m_ * m_;
  const s2 = s_ * s_ * s_;

  const r = 4.0767416621 * l2 - 3.3077363322 * m2 + 0.2309101289 * s2;
  const g = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193761 * s2;
  const b = -0.0041960771 * l2 - 0.7034186147 * m2 + 1.707614701 * s2;

  return [
    Math.max(0, Math.min(255, Math.round(linearToSrgb(r) * 255))),
    Math.max(0, Math.min(255, Math.round(linearToSrgb(g) * 255))),
    Math.max(0, Math.min(255, Math.round(linearToSrgb(b) * 255)))
  ];
}

// Helper untuk linearToSrgb
function linearToSrgb(x) {
  if (x <= 0.0031308) return 12.92 * x;
  return 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}

// Konversi hex ke RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// Hitung luminansi relatif (WCAG)
function getLuminance(rgbArray) {
  const [r, g, b] = rgbArray.map(v => {
    v = v / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Hitung contrast ratio
function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Check WCAG level
function getWCAGLevel(ratio) {
  if (ratio >= 7) return 'AAA (7:1)';
  if (ratio >= 4.5) return 'AA (4.5:1)';
  if (ratio >= 3) return 'Large text (3:1)';
  return 'FAIL';
}

console.log('\n♿ WCAG 2.1 CONTRAST AUDIT\n');
console.log('='.repeat(70) + '\n');

// Contraste tests
const contrastTests = [
  { name: 'Text on Background', fg: '#030213', bg: '#ffffff' },
  { name: 'Secondary Text', fg: '#717182', bg: '#ffffff' },
  { name: 'Muted Text', fg: '#ececf0', bg: '#030213' },
  { name: 'Primary Button', fg: '#ffffff', bg: '#030213' },
  { name: 'Secondary Button', fg: '#030213', bg: '#ececf0' },
  { name: 'Destructive Button', fg: '#ffffff', bg: '#d4183d' },
  { name: 'Link Text', fg: '#030213', bg: 'transparent' }, // Special case
  { name: 'Sidebar Text', fg: '#030213', bg: 'oklch(0.985 0 0)' }, // Near white
  { name: 'Dark mode Text', fg: 'oklch(0.985 0 0)', bg: 'oklch(0.145 0 0)' },
  { name: 'Dark mode Secondary', fg: 'oklch(0.985 0 0)', bg: '#717182' }, // Potential issue
];

const results = [];

contrastTests.forEach(test => {
  let rgb1, rgb2;

  // Parse colors
  if (test.fg.startsWith('#')) {
    rgb1 = hexToRgb(test.fg);
  } else if (test.fg.startsWith('oklch')) {
    // Simple oklch parser - real implementation would be more robust
    console.log(`⚠️  ${test.name}: OKLCH colors need proper conversion`);
    return;
  }

  if (test.bg.startsWith('#')) {
    rgb2 = hexToRgb(test.bg);
  } else if (test.bg === 'transparent') {
    rgb2 = [255, 255, 255]; // Default white background
  } else if (test.bg.startsWith('oklch')) {
    console.log(`⚠️  ${test.name}: OKLCH colors need proper conversion`);
    return;
  }

  if (rgb1 && rgb2) {
    const ratio = getContrastRatio(rgb1, rgb2);
    const level = getWCAGLevel(ratio);
    const pass = ratio >= 4.5;

    results.push({
      name: test.name,
      ratio: ratio.toFixed(2),
      level,
      pass
    });
  }
});

// Display results
console.log('✅ PASSING (AA or better):\n');
results.filter(r => r.pass).forEach(r => {
  console.log(`  ${r.name.padEnd(25)} ${r.ratio.padStart(5)}:1  ${r.level}`);
});

console.log('\n⚠️  NEEDS IMPROVEMENT:\n');
results.filter(r => !r.pass).forEach(r => {
  console.log(`  ${r.name.padEnd(25)} ${r.ratio.padStart(5)}:1  ${r.level}`);
});

console.log('\n' + '='.repeat(70));
console.log('\n📋 WCAG 2.1 Standards:\n');
console.log('  AA (minimum):    4.5:1 for normal text, 3:1 for large text');
console.log('  AAA (enhanced):  7:1 for normal text, 4.5:1 for large text');
console.log('  Large text:      18pt+ or 14pt+ bold\n');

console.log('='.repeat(70) + '\n');

// Recommendations
console.log('💡 RECOMMENDATIONS:\n');
console.log('1. Update --muted-foreground from #717182 to darker gray');
console.log('2. Ensure focus states have 3:1 minimum contrast');
console.log('3. Test with WebAIM Contrast Checker for certainty');
console.log('4. Add visual keyboard navigation indicators');
console.log('5. Test with screen reader (NVDA, JAWS, VoiceOver)\n');
