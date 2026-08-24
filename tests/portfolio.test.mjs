import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(path.join(root, "index.html"), "utf8");

const flagshipProjects = [
  {
    title: "EU Tender Intelligence Agent",
    route: "https://applied-ai-lab.smjlw.chatgpt.site/eu-tender-intelligence-agent",
  },
  {
    title: "Finland Rail Monitoring System",
    route: "https://applied-ai-lab.smjlw.chatgpt.site/finland-rail-reliability-monitor",
  },
  {
    title: "Olist Delivery Delay Predictor",
    route: "https://applied-ai-lab.smjlw.chatgpt.site/olist-delivery-delay-predictor",
  },
];

function valuesFor(attribute) {
  return [...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
}

test("surfaces the three current flagship projects and their direct routes", () => {
  for (const project of flagshipProjects) {
    assert.match(html, new RegExp(project.title));
    assert.ok(valuesFor("href").includes(project.route), `Missing direct live route for ${project.title}`);
  }

  assert.ok(valuesFor("href").includes("https://github.com/Sintagmatarches/applied-ai-lab#eu-tender-intelligence-agent"));
  assert.ok(valuesFor("href").includes("https://github.com/Sintagmatarches/applied-ai-lab#finland-rail-monitoring-system"));
  assert.ok(valuesFor("href").includes("https://github.com/Sintagmatarches/applied-ai-lab#olist-delivery-delay-predictor"));
  assert.match(html, /15 recorded real TED notices and 30 curated retrieval scenarios/);
  assert.match(html, /source-derived portfolio evidence—not general AI accuracy/);
});

test("uses the approved current Olist benchmark and rejects known stale values", () => {
  assert.match(html, /PR-AUC<\/dt><dd>6\.32%/);
  assert.match(html, /ROC-AUC<\/dt><dd>63\.44%/);
  assert.match(html, /107 \/ 620/);
  assert.doesNotMatch(html, /9\.90%|72\.49%|170\s*(?:of|\/)\s*620/i);
});

test("keeps local links and media references resolvable", async () => {
  const localTargets = [...new Set([...valuesFor("href"), ...valuesFor("src")])]
    .map((value) => value.split("?")[0].split("#")[0])
    .filter((value) => value && !/^(?:https?:|mailto:|#)/.test(value));

  for (const target of localTargets) {
    await assert.doesNotReject(access(path.join(root, target)), `Missing local target: ${target}`);
  }
});

test("preserves basic static accessibility and security invariants", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta name="viewport"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<nav[^>]+aria-label="Primary navigation"/);
  assert.match(html, /<dialog[^>]+aria-labelledby=/);

  for (const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []) {
    assert.match(tag, /rel="noreferrer"/, `External new-tab link lacks rel=noreferrer: ${tag}`);
  }

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    assert.match(tag, /alt="[^"]*"/, `Image lacks alt text: ${tag}`);
  }
});

test("cache-busts tracked static assets with the current release token", () => {
  assert.match(html, /styles\.css\?v=20260824-tender-evals-v2-1/);
  assert.match(html, /script\.js\?v=20260824-tender-evals-v2-1/);
});
