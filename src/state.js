import fs from "fs";

const path = "data/state.json";

export function loadState() {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export function saveState(state) {
  fs.writeFileSync(path, JSON.stringify(state, null, 2));
}
