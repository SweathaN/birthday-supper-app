#!/usr/bin/env node
/**
 * apply-sync.mjs
 * Usage:
 *   node scripts/apply-sync.mjs path/to/supper-sync-yyyy-mm-dd-hhmm.json [--write]
 *
 * Reads a snapshot produced by the Sync button, prints a human-readable diff
 * summary, and (with --write) merges overrides back into the data/*.js source files.
 *
 * Conservative policy: only fields present in `overrides` are touched;
 * all other content is preserved exactly as-is.
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../data");

// ── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const snapPath = args.find(a => !a.startsWith("--"));
const doWrite  = args.includes("--write");

if (!snapPath) {
  console.error("Usage: node scripts/apply-sync.mjs <snapshot.json> [--write]");
  process.exit(1);
}

// ── Load snapshot ─────────────────────────────────────────────────────────────

let snap;
try {
  snap = JSON.parse(fs.readFileSync(snapPath, "utf8"));
} catch (err) {
  console.error(`Cannot read snapshot: ${err.message}`);
  process.exit(1);
}

if (!snap.version || snap.version < 2) {
  console.error("Snapshot version < 2 or missing. Only v2 snapshots are supported.");
  process.exit(1);
}

const overrides = snap.overrides || {};
console.log(`\nSnapshot exported: ${snap.exportedAt}`);
console.log(`Overrides last updated: ${overrides.updatedAt || "unknown"}`);

// ── Load a window.PB_* data file using vm ────────────────────────────────────

function loadDataFile(filename) {
  const fullPath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  const src = fs.readFileSync(fullPath, "utf8");
  const ctx = { window: {} };
  try {
    vm.runInNewContext(src, ctx);
  } catch (err) {
    console.warn(`  Warning: could not parse ${filename}: ${err.message}`);
    return null;
  }
  return ctx.window;
}

// ── Pretty-print diff helper ──────────────────────────────────────────────────

function diffLog(label, oldVal, newVal) {
  if (JSON.stringify(oldVal) === JSON.stringify(newVal)) return;
  console.log(`  ~ ${label}`);
  console.log(`      old: ${JSON.stringify(oldVal)}`);
  console.log(`      new: ${JSON.stringify(newVal)}`);
}

// ── Merge meta ────────────────────────────────────────────────────────────────

function applyMetaOverrides(w, metaOv) {
  if (!w.PB_META || !metaOv) return false;
  let changed = false;
  Object.entries(metaOv).forEach(([key, val]) => {
    if (JSON.stringify(w.PB_META[key]) !== JSON.stringify(val)) {
      diffLog(`meta.${key}`, w.PB_META[key], val);
      w.PB_META[key] = val;
      changed = true;
    }
  });
  return changed;
}

// ── Merge courses ─────────────────────────────────────────────────────────────

function applyCoursesOverrides(w, coursesOv, deletedSteps) {
  if (!w.PB_COURSES || !coursesOv) return false;
  const deleted = deletedSteps || [];
  let changed = false;

  w.PB_COURSES = w.PB_COURSES.map(course => {
    const co = coursesOv[course.id];
    if (!co) {
      // Still filter deleted steps from unchanged courses
      const filteredSteps = (course.steps || []).filter(s => !deleted.includes(s.id));
      if (filteredSteps.length !== (course.steps || []).length) {
        console.log(`  - Removed ${(course.steps || []).length - filteredSteps.length} deleted step(s) from ${course.id}`);
        changed = true;
        return Object.assign({}, course, { steps: filteredSteps });
      }
      return course;
    }

    const updated = Object.assign({}, course);

    if (co.name !== undefined) { diffLog(`courses.${course.id}.name`, course.name, co.name); updated.name = co.name; changed = true; }
    if (co.summary !== undefined) { diffLog(`courses.${course.id}.summary`, course.summary, co.summary); updated.summary = co.summary; changed = true; }
    if (co.components !== undefined) { console.log(`  ~ courses.${course.id}.components (merged)`); updated.components = co.components; changed = true; }

    // Merge step overrides
    const stepOv = co.steps || {};
    let steps = (course.steps || []).filter(s => !deleted.includes(s.id)).map(s => {
      const so = stepOv[s.id];
      if (!so) return s;
      const merged = Object.assign({}, s, so);
      Object.keys(so).forEach(k => diffLog(`courses.${course.id}.steps.${s.id}.${k}`, s[k], so[k]));
      changed = true;
      return merged;
    });

    // Append user-added steps (filter already-deleted ones)
    const addedSteps = (co.addedSteps || []).filter(s => !deleted.includes(s.id));
    if (addedSteps.length) {
      console.log(`  + ${addedSteps.length} user-added step(s) in ${course.id}: ${addedSteps.map(s => s.id).join(", ")}`);
      steps = [...steps, ...addedSteps];
      changed = true;
    }

    updated.steps = steps;
    return updated;
  });

  return changed;
}

// ── Serialize a JS value back to source ──────────────────────────────────────

function serialize(val, indent) {
  const pad = " ".repeat(indent);
  const pad1 = " ".repeat(indent + 2);
  if (val === null) return "null";
  if (typeof val === "boolean" || typeof val === "number") return String(val);
  if (typeof val === "string") return JSON.stringify(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map(v => pad1 + serialize(v, indent + 2));
    return `[\n${items.join(",\n")}\n${pad}]`;
  }
  if (typeof val === "object") {
    const entries = Object.entries(val).map(
      ([k, v]) => `${pad1}${/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k)}: ${serialize(v, indent + 2)}`
    );
    return `{\n${entries.join(",\n")}\n${pad}}`;
  }
  return String(val);
}

// ── Write a data file ─────────────────────────────────────────────────────────

function writeDataFile(filename, globalName, value) {
  const out = `window.${globalName} = ${serialize(value, 0)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, filename), out, "utf8");
  console.log(`  Wrote ${filename}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log("\n── Diff Summary ─────────────────────────────────────────────────────────────");

const wMeta = loadDataFile("meta.js");
const wCourses = loadDataFile("courses.js");

let metaChanged = false;
let coursesChanged = false;

if (wMeta && overrides.meta && Object.keys(overrides.meta).length) {
  console.log("\n[meta.js]");
  metaChanged = applyMetaOverrides(wMeta, overrides.meta);
  if (!metaChanged) console.log("  (no changes)");
} else {
  console.log("\n[meta.js] no overrides");
}

if (wCourses && (overrides.courses || overrides.deletedSteps)) {
  console.log("\n[courses.js]");
  coursesChanged = applyCoursesOverrides(wCourses, overrides.courses || {}, overrides.deletedSteps || []);
  if (!coursesChanged) console.log("  (no changes)");
} else {
  console.log("\n[courses.js] no overrides");
}

console.log("\n── End of diff ──────────────────────────────────────────────────────────────");

if (!doWrite) {
  console.log("\nDry run complete. Pass --write to apply changes.");
} else {
  console.log("\nWriting files…");
  if (metaChanged && wMeta) writeDataFile("meta.js", "PB_META", wMeta.PB_META);
  if (coursesChanged && wCourses) writeDataFile("courses.js", "PB_COURSES", wCourses.PB_COURSES);
  console.log("Done. Review the diff above, then git add + commit + push.");
}
