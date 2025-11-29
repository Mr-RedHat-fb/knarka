#!/usr/bin/env node
import { runWatcher } from "./flashback/watcher.js";

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

if (args.includes("--inte")) {
  console.log("Watchern stoppas.");
  process.exit(0);
}

// Om `--nu` finns: skriv ett meddelande.
// Om inga args: starta tyst headless.
if (args.includes("--nu")) {
  console.log("Watchern startar… (headless)");
}

loop();

