/**
 * 将 index.html 海报导出为 PNG（750px 宽，2x 像素密度）
 * 用法：node scripts/export-poster.mjs [输出目录]
 */
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outDir =
  process.argv[2] || "D:\\素材\\银行导出\\周报";
const fileName = "湖南银行代销_资管信托5月排期表.png";

fs.mkdirSync(outDir, { recursive: true });

const htmlPath = path.join(projectRoot, "index.html");
const htmlUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;
const outPath = path.join(outDir, fileName);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--font-render-hinting=none"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 750, height: 1200, deviceScaleFactor: 2 });

  await page.goto(htmlUrl, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => {
      const main = document.getElementById("poster-main");
      return main && main.children.length > 0;
    },
    { timeout: 30000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  const height = await page.evaluate(() => {
    const el = document.getElementById("poster-wrapper");
    return Math.ceil(el.getBoundingClientRect().height);
  });

  await page.setViewport({
    width: 750,
    height: Math.max(height, 800),
    deviceScaleFactor: 2,
  });

  const wrapper = await page.$("#poster-wrapper");
  if (!wrapper) throw new Error("未找到 #poster-wrapper");

  await wrapper.screenshot({ path: outPath, type: "png" });
  console.log(`已导出：${outPath}`);
} finally {
  await browser.close();
}
