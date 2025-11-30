#!/usr/bin/env node
import { runWatcher } from "./flashback/watcher.js";
import { startTestApi } from "./api/server.js";

function randomInterval() {
  const min = 22000;
  const max = 38000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loop() {
  try {
    await runWatcher();
  } catch (err) {
    console.error("[knarka] Fel i watcher:", err.message);
  }

  setTimeout(loop, randomInterval());
}

const args = process.argv.slice(2);

if (args.includes("--api")) {
  // starta bara test-API
  startTestApi(3000);
} else if (args.includes("--inte")) {
  console.log("Watchern stoppas.");
  process.exit(0);
} else {
  if (args.includes("--nu")) {
    console.log("Watchern startar…");
  }
  loop();
}

