// src/discord/notify.js
import fetch from "node-fetch";
import config from "../config.js";

export async function notifyNewThread(thread) {
  if (!config.discordWebhook) {
    throw new Error("DISCORD_WEBHOOK_URL saknas i config/.env");
  }

  const content = [
    `**Trådtitel:** ${thread.title}`,
    `**Länk:** ${thread.url}`
  ].join("\n");

  const res = await fetch(config.discordWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    throw new Error(`Discord-webhook misslyckades: ${res.status} ${res.statusText}`);
  }
}

