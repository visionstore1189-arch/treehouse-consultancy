import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((x) =>
        x.isDirectory()
          ? files(path.join(dir, x.name))
          : [path.join(dir, x.name)],
      ),
    )
  ).flat();
}
const html = (await files("out")).filter((x) => x.endsWith(".html"));
const targets = new Set();
for (const file of html) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (url.startsWith("/") && !url.startsWith("//"))
      targets.add(decodeURI(url));
  }
}
const errors = [];
for (const url of targets) {
  const local = path.join("out", url);
  try {
    const s = await stat(local);
    if (s.isDirectory()) await stat(path.join(local, "index.html"));
  } catch {
    errors.push(url);
  }
}
if (errors.length)
  throw new Error("Missing exported link/assets: " + errors.join(", "));
console.log(
  `Checked ${html.length} HTML files and ${targets.size} unique internal links/assets: no broken targets.`,
);
