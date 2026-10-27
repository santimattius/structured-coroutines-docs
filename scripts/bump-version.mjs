#!/usr/bin/env node
// Usage: node scripts/bump-version.mjs <version>   (e.g. 1.3.0 or v1.3.0)
// Rewrites the toolkit-version references in constants.tsx. Idempotent.
// Does not touch changelog history, "vX.Y.Z+" prose, or the IntelliJ plugin version.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raw = process.argv[2];
if (!raw) {
  console.error('Usage: node scripts/bump-version.mjs <version>');
  process.exit(2);
}
const version = raw.replace(/^v/, '');
if (version.includes('-')) {
  console.error(`Refusing prerelease version: ${version}`);
  process.exit(2);
}
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error(`Invalid version (expected X.Y.Z): ${version}`);
  process.exit(2);
}

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'constants.tsx');
let content = readFileSync(file, 'utf-8');

const V = '\\d+\\.\\d+\\.\\d+';
const rules = [
  { name: 'Toolkit badge alt text', re: new RegExp(`(\\[!\\[Toolkit )${V}(\\])`, 'g'), to: `$1${version}$2` },
  { name: 'Toolkit badge image', re: new RegExp(`(Toolkit-)${V}(-purple)`, 'g'), to: `$1${version}$2` },
  {
    name: 'Gradle plugin version',
    re: new RegExp(`(id\\("io\\.github\\.santimattius\\.structured-coroutines"\\) version ")${V}(")`, 'g'),
    to: `$1${version}$2`,
  },
  {
    name: 'annotations coordinate',
    re: new RegExp(`(structured-coroutines-annotations:)${V}`, 'g'),
    to: `$1${version}`,
  },
  {
    name: 'detekt-rules coordinate',
    re: new RegExp(`(structured-coroutines-detekt-rules:)${V}`, 'g'),
    to: `$1${version}`,
  },
  {
    name: 'lint-rules coordinate',
    re: new RegExp(`(structured-coroutines-lint-rules:)${V}`, 'g'),
    to: `$1${version}`,
  },
];

let missing = 0;
console.log(`Bumping toolkit references to ${version}`);
for (const rule of rules) {
  const matches = content.match(rule.re) ?? [];
  if (matches.length === 0) {
    console.error(`  MISSING  ${rule.name}: no occurrences found`);
    missing++;
    continue;
  }
  const changed = matches.filter((m) => m.replace(rule.re, rule.to) !== m).length;
  content = content.replace(rule.re, rule.to);
  console.log(`  ${rule.name}: ${matches.length} found, ${changed} changed`);
}

if (missing > 0) {
  console.error(`${missing} expected pattern(s) missing; file not written.`);
  process.exit(1);
}
writeFileSync(file, content, 'utf-8');
console.log('Done.');
