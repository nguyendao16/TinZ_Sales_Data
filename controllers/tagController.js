const customerAds = require('../models/customerAdsModel');
const consultants = ["hoài","nga","kiều","thanh","đào nhung"];
exports.handle = async (req, res) => {
  try {
    const change = req.body.entry?.[0]?.changes?.[0]?.value;
    const tag    = change?.label?.page_label_name;
    const psid   = change?.user?.id;
    if (!psid) return res.sendStatus(400);
    if (consultants.includes(tag.trim().toLowerCase())) {
      await customerAds.updateTag(psid, tag.trim());
    }
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};