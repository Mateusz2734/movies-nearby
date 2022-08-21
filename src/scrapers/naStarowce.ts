import { split, trim, without, chunk, zip } from "lodash";
import { load } from "cheerio";
import axios from "axios";
import dayjs from 'dayjs';

export default async function run(date: string) {
  const result = await axios.get(`http://kino.zory.pl/wydarzenia-${dayjs(date).format("YYYY-MM-DD")}.html`);
  const $ = load(result.data);
  const titles = without(chunk(split($("td.title").text(), "\n").map(title => trim(title)), 3).map(title => title[1]), undefined);
  const infos = without(chunk(split($("td.info").text(), "\n").map(info => trim(info)), 2).map(info => info[0]).map(info => info.slice(-5)), "").map(info => [info]);
  const zipped = zip(titles, infos);
  const movies: Object[] = [];
  for (const entry of zipped) {
    movies.push({ title: entry[0], time: entry[1] });
  }
  return { date: dayjs(date).format("YYYY-MM-DD"), cinema: "Kino na Starówce Żory", movies: movies };
}
