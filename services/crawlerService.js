const { launchBrowser } = require("../config/puppeteerConfig");

const crawlDomain = async (domain) => {
  const productUrls = [];
  const urlPatterns = ["/product/", "/item/", "/p/"];

  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(`https://${domain}`, { waitUntil: "networkidle2" });

    // Wait for dynamic content to load
    await page.waitForTimeout(3000);

    // Extract all links on the page
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a")).map((a) => a.href)
    );

    // Filter links matching product patterns
    productUrls.push(
      ...links.filter((link) =>
        urlPatterns.some((pattern) => link.includes(pattern))
      )
    );

    // Handle pagination
    const nextButton = await page.$('a[rel="next"]');
    if (nextButton) {
      const nextUrl = await page.evaluate((el) => el.href, nextButton);
      productUrls.push(...(await crawlDomain(nextUrl)));
    }
  } catch (err) {
    console.error(`Failed to crawl ${domain}:`, err.message);
  } finally {
    await browser.close();
  }

  return [...new Set(productUrls)]; // Remove duplicates
};

module.exports = { crawlDomain };
