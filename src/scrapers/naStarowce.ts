import { split, trim, without, chunk, zip } from "lodash";
import { load } from "cheerio";
import axios from "axios";
import dayjs from 'dayjs';

export default async function run(date: string) {
  const unifiedDate: string = dayjs(date).format("YYYY-MM-DD");
  const result = await axios.get(`http://kino.zory.pl/wydarzenia-${unifiedDate}.html`);
  const $ = load(result.data);
  // Parse the titles according to the page structure
  const titles = without(chunk(split($("td.title").text(), "\n").map(title => trim(title)), 3).map(title => title[1]), undefined);
  // Parse the times according to the page structure
  const infos = without(chunk(split($("td.info").text(), "\n").map(info => trim(info)), 2).map(info => info[0]).map(info => info.slice(-5)), "").map(info => [info]);
  // Combine info and title arrays
  const zipped = zip(titles, infos);
  // New array for proper output format
  const movies: Object[] = [];
  for (const entry of zipped) {
    movies.push({ title: entry[0], time: entry[1] });
  }
  // Return unified object
  return { date: unifiedDate, city: "Żory", type: "Na Starówce", cinema: "Kino na Starówce Żory", movies: movies };
}
