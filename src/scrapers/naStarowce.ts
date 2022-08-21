import { load } from "cheerio";
import axios from "axios";
import { split, trim, without, chunk, zip } from "lodash";

export default async function run(url: string) {
  const result = await axios.get(url);
  const $ = load(result.data);
  const titles = without(chunk(split($("td.title").text(), "\n").map(title => trim(title)), 3).map(title => title[1]), undefined);
  const infos = without(chunk(split($("td.info").text(), "\n").map(info => trim(info)), 2).map(info => info[0]).map(info => info.slice(-5)), "");
  return zip(titles, infos);
}
