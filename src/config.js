import 'dotenv/config';

export default {
  webhook: process.env.DISCORD_WEBHOOK_URL,
  token: process.env.FLASHBACK_TOKEN,
  interval: Number(process.env.POLL_INTERVAL) || 5000,
  flashbackUrl: process.env.FLASHBACK_FORUM_URL
};

