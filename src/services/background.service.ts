import { fork } from "child_process";

export function startBackgroundScraping() {
  fork(`./src/childprocess/background.ts`);
}
