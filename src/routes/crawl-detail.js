import { Router } from "express";
import rp from "request-promise";
import cheerio from "cheerio";

const crawlDetail = Router();

crawlDetail.get("/product", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ message: "URL is required"});
  }
  try {
    const htmlString = await rp(url, { timeout: 1000 });
    const $ = cheerio.load(htmlString, { decodeEntities: false });
    const sku = extractSku($, ".product-info > span");
    const name = extractName($, ".prod-title b");
    if (!name) {
      return res.status(400).json({ message: "URL is wrong"});
    }
    const brand = extractBrand($, ".product-detail-img > a img", { attr: "alt" });
    const price = extractPrice($, "#product-info-price tr:last-child b");
    const oridinalPrice = extractPrice($, "b[style*=\"text-decoration: line-through\"]");
    const images = extractImages($, "#img_thumb img");
    const promotion = extractPromotion($, ".square-trade-content");
    const specification = extractSpecification($, "#tab2 table");
    const status = "AVAILABLE";
    res.status(200).json({ sku, name, brand, url, price, oridinalPrice, images, promotion, specification, status });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
});

const extractName = ($, selector, options = {}) => {
  const name = $(selector).text().trim();
  return name;
}
const extractSku = ($, selector, options = {}) => {
  const sku = $(selector).text().trim();
  return sku;
}
const extractBrand = ($, selector, options = {}) => {
  let brand = null;
  const { attr } = options;
  const brandWrap = $(selector);
  if (attr) {
    brand = brandWrap.attr(attr);
  } else {
    brand = brandWrap.text();
  }
  return brand;
}
const extractPrice = ($, selector, options = {}) => {
  const priceWrap = $(selector).text();
  return priceWrap;
}
const extractImages = ($, selector, options = {}) => {
  const urlImages = [];
  $(selector).each((index, value) => {
    const url = $(value).attr("src");
    urlImages.push(url);
  });
  return urlImages;
}
const extractPromotion = ($, selector, options = {}) => {
  const promotion = $(selector).html();
  return promotion;
}
const extractSpecification = ($, selector, options = {}) => {
  const specification = $(selector).html();
  return specification;
}

// sku, url, name, brand, price, originalPrice, images, promotion, specification, status

export default crawlDetail;
