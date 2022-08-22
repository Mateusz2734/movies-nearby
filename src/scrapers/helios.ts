import { split, trim, zip, slice } from "lodash";
import { load } from "cheerio";
import { howManyDaysFromToday } from "../utils/dates.util";
import axios from "axios";
import dayjs from 'dayjs';

export default async function run(date: string) {
  const urlDay = howManyDaysFromToday(date);
  if (urlDay < 0 || urlDay > 7) {
    // Return unified object with empty array to prevent axios errors
    return { date: dayjs(date).format("YYYY-MM-DD"), cinema: "Kino Helios Żory", movies: [] };
  } else {
    const result = await axios.get(`https://www.helios.pl/64,Zory/Repertuar/index/dzien/${urlDay}`);
    const $ = load(result.data);
    // Parse the titles according to the page structure
    const titles = slice(split($(".movie-link").text(), "\n").map(info => trim(info)), 1);
    // Parse the times according to the page structure
    const infos = split($("div.time").text(), "\n").map(info => info.replace(/\t/g, '')).map(info => info.replace(/\*/g, '').match(/.{1,5}/g)).slice(-titles.length);
    if (infos.includes(null)) {
      // Return unified object with empty array to prevent weird behavior
      return { date: dayjs(date).format("YYYY-MM-DD"), cinema: "Kino Helios Żory", movies: [] };
    } else {
      // Combine info and title arrays
      const zipped = zip(titles, infos);
      // New array for proper output format
      const movies: Object[] = [];
      for (const entry of zipped) {
        movies.push({ title: entry[0], time: entry[1] });
      }
      // Return unified object
      return { date: dayjs(date).format("YYYY-MM-DD"), cinema: "Kino Helios Żory", movies: movies };
    }
  }
}
