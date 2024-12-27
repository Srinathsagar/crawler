const { crawlDomain } = require("../services/crawlerService");
const Domain = require("../models/domain");

const crawl = async (req, res) => {
  const { domains } = req.body;

  if (!Array.isArray(domains) || domains.length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid input: Provide an array of domains" });
  }

  try {
    const results = await Promise.all(
      domains.map(async (domain) => {
        const productUrls = await crawlDomain(domain);
        await Domain.findOneAndUpdate(
          { domain },
          { domain, productUrls, crawledAt: new Date() },
          { upsert: true, new: true }
        );
        return { domain, productUrls };
      })
    );

    res.status(200).json({ message: "Crawling completed", results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crawl };
