#!/usr/bin/env node
import { runWatcher } from "./flashback/watcher.js";

const args = process.argv.slice(2);

function randomInterval() {
  // 22–38 sekunder
  const min = 22000;
  const max = 38000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (args.includes("--nu")) {
  console.log("Watchern startar…");

  async function loop() {
    await runWatcher();
    const next = randomInterval();
    setTimeout(loop, next);
  }

  loop();
}
else if (args.includes("--inte")) {
  console.log("Watchern stoppas.");
  process.exit(0);
}
else {
  console.log("Använd: knarka --nu   eller   knarka --inte");
}

