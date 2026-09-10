/**
 * Bundles ES modules into one file for file:// (double-click) usage.
 * Run: node scripts/build-bundle.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const files = [
  "js/templates/signup-templates.js",
  "js/templates/website-templates.js",
  "js/config/scopes.js",
  "js/config/surfaces.js",
  "js/data/signup-screens.js",
  "js/data/login-screens.js",
  "js/data/website-screens.js",
  "js/components/shell.js",
  "js/app.js",
];

function stripModuleSyntax(code) {
  return code
    .replace(/^import\s+.+from\s+['"][^'"]+['"];?\s*$/gm, "")
    .replace(/^export\s+(const|function|class)\s+/gm, "$1 ")
    .replace(/^export\s+\{[^}]+\};?\s*$/gm, "")
    .replace(/^export\s+default\s+/gm, "");
}

let bundle = files
  .map((f) => {
    const full = path.join(root, f);
    if (!fs.existsSync(full)) throw new Error(`Missing: ${f}`);
    return `/* ── ${f} ── */\n${stripModuleSyntax(fs.readFileSync(full, "utf8"))}`;
  })
  .join("\n\n");

const out = path.join(root, "js/bundle.js");
fs.writeFileSync(out, bundle);
console.log("Wrote", out, `(${(bundle.length / 1024).toFixed(1)} KB)`);
