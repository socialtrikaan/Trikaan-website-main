import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3001";
const out = process.argv[3] || "/tmp/claude-1000/-mnt-c-Users-chara-trikaan-website/17fc0c30-8f9d-4c04-a4cf-ff72d180c7f5/scratchpad/render.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500); // let entrance animations settle
// full hero area
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 1600 } });
await browser.close();
console.log("shot ->", out);
