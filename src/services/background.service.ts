import { ChildProcess, fork } from "child_process";
import { Chance } from "chance";
import { chunk } from "lodash";
import { CinemaObject } from "../common/types";
import cinemaList from "../db/cinemaList.db";
import { log } from "../log/logger";

export function startBackgroundScraping() {
  var seed = new Chance(12345);

  const listOfChunks: CinemaObject[][] = chunk(seed.shuffle(cinemaList), 31);
  listOfChunks.map((chunk: CinemaObject[], index: number) =>
    forkBackgroundProcess(chunk, index)
  );
}

const forkBackgroundProcess = (list: CinemaObject[], name: number): void => {
  const back: ChildProcess = fork(`./src/childprocess/background.ts`, [
    `${name}`,
  ]);
  back.send(list);
  back.on("disconnect", (): void => {
    log.info(`Child process ${name} disconnected.`);
    back.kill();
  });
};
