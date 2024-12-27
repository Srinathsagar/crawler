const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  productUrls: { type: [String], default: [] },
  crawledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Domain", domainSchema);
