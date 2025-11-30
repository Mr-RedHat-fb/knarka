// src/config.js
import "dotenv/config";

export default {
  discordWebhook: process.env.DISCORD_WEBHOOK_URL || null,
  testWebhook: process.env.TEST_WEBHOOK_URL || null
};
