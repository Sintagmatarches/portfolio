import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Deliberately separate from offline tests: this checks current public main branches.
const base = 'https://raw.githubusercontent.com/Sintagmatarches';
async function source(repository, path) {
  const response = await fetch(`${base}/${repository}/main/${path}`, {
    signal: AbortSignal.timeout(20_000), cache: 'no-store',
  });
  assert.ok(response.ok, `${repository}/${path}: HTTP ${response.status}`);
  return response.text();
}

const [waterText, geoText, olistText, profile, html, readme] = await Promise.all([
  source('helsinki-water-forecasting-optimization', 'artifacts/v1.0.0/metrics.json'),
  source('finland-geospatial-ai', 'artifacts/test-metrics.json'),
  source('applied-ai-lab', 'artifacts/metrics.json'),
  source('Sintagmatarches', 'README.md'),
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../README.md', import.meta.url), 'utf8'),
]);
const water = JSON.parse(waterText);
const geo = JSON.parse(geoText).test_metrics;
const olist = JSON.parse(olistText).final_test;
const ets = water.finalPropertyMetrics.find(row => row.model === 'ets');
assert.equal(water.selectedModel, 'ets', 'Reassess the public selected-model claim');
const percent = value => `${(value * 100).toFixed(2)}%`;
const claims = [
  { title: 'Helsinki Water — Forecasting + Optimization', values: [
    ets.mase.toFixed(3), percent(water.uncertainty.propertyPanelFinal.coverage),
    `${water.sensitivity.find(row => row.scenario === 'budget_hours=8').improvementPct.toFixed(2)}%`,
  ] },
  { title: 'Finland Geospatial AI', values: [geo.miou.toFixed(4), geo.macro_dice.toFixed(4)] },
  { title: 'Olist Delivery Delay Predictor', values: [percent(olist.pr_auc), percent(olist.roc_auc)] },
];
for (const { title, values } of claims) {
  const article = [...html.matchAll(/<article class="flagship-card">([\s\S]*?)<\/article>/g)]
    .find(match => match[1].includes(`<h3>${title}</h3>`))?.[1];
  const profileSection = profile.split(`### ${title}`)[1]?.split('\n### ')[0]?.split('\n## ')[0];
  assert.ok(article && profileSection, `Missing project: ${title}`);
  for (const value of values) {
    for (const [label, text] of [['card', article], ['profile section', profileSection], ['README', readme]]) {
      assert.ok(text.includes(value), `${title} ${label} is missing source-derived ${value}`);
    }
  }
  console.log(`${title}: ${values.length} source-derived values agree across card, profile and README`);
}
