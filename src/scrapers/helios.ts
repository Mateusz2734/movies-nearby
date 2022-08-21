import { split, trim, zip, slice } from "lodash";
import { load } from "cheerio";
import axios from "axios";
import dayjs from 'dayjs';

export default async function run(date: string) {
  const result = await axios.get("https://www.helios.pl/64,Zory/Repertuar/index/dzien/0/kino/64");
  const $ = load(result.data);
  const titles = slice(split($(".movie-link").text(), "\n").map(info => trim(info)), 1);
  const infos = split($("div.time").text(), "\n").map(info => info.replace(/\t/g, '')).map(info => info.replace(/\*/g, '').match(/.{1,5}/g)).slice(-titles.length);
  const zipped = zip(titles, infos);
  const movies: Object[] = [];
  for (const entry of zipped) {
    movies.push({ title: entry[0], time: entry[1] });
  }
  return { date: dayjs(date).format("YYYY-MM-DD"), cinema: "Kino Helios Żory", movies: movies };
}
