import { createServer } from 'node:http';
import { readFileSync, existsSync, createReadStream } from 'node:fs';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const ROOT = 'storybook-static';
const BUDGET = Number(process.env.A11Y_BUDGET ?? 1);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.map': 'application/json' };

if (!existsSync(join(ROOT, 'index.json'))) {
  console.error(`No ${ROOT}/index.json — run "npm run build-storybook" first.`);
  process.exit(1);
}

const server = createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  const file = join(ROOT, p === '/' ? '/index.html' : p);
  if (!file.startsWith(ROOT) || !existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const stories = Object.values(JSON.parse(readFileSync(join(ROOT, 'index.json'), 'utf8')).entries)
  .filter((e) => e.type === 'story');
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage();
const found = [];

for (const story of stories) {
  await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#storybook-root > *').catch(() => {});
  await page.evaluate(axeSource);
  const { violations } = await page.evaluate(() =>
    window.axe.run('#storybook-root', {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    }),
  );
  for (const v of violations) found.push({ story: story.id, rule: v.id, impact: v.impact });
}

await browser.close();
server.close();

for (const f of found) console.log(`  ${f.impact.padEnd(8)} ${f.rule.padEnd(18)} ${f.story}`);
console.log(`\n${found.length} violation(s) across ${stories.length} stories — budget ${BUDGET}`);

if (found.length > BUDGET) {
  console.error(`\nOver budget by ${found.length - BUDGET}.`);
  process.exit(1);
}
console.log('Within budget.');
