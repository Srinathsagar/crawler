const puppeteer = require("puppeteer");

const launchBrowser = async () => {
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

module.exports = { launchBrowser };
