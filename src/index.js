#!/usr/bin/env node
import { runWatcher } from "./flashback/watcher.js";

const args = process.argv.slice(2);

if (args.includes("--nu")) {
  console.log("Watchern startar…");
  setInterval(runWatcher, 5000);
} else if (args.includes("--inte")) {
  console.log("Watchern stoppas (fast egentligen gör du inget här).");
  process.exit(0);
} else {
  console.log("Använd: knarka --nu   eller   knarka --inte");
}

