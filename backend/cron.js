// cron.js
import cron from "node-cron";
import User from "./models/nameSchema.js";
import Msg from "./models/messageSchema.js";

export const startCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const verifiedLeads = await User.find({ status: "Verified", synced: false });

    if (verifiedLeads.length === 0) {
      console.log("[Cron] No verified leads to sync");
    }

    for (const lead of verifiedLeads) {
      const logMsg = `[CRM Sync] Sending verified lead (${lead.name}) to Sales Team...`;

      console.log(logMsg);
      await Msg.create({ message: logMsg });

      lead.synced = true;
      await lead.save();
    }
  });
};
