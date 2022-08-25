import { split, trim, zip, slice } from "lodash";
import { load } from "cheerio";
import axios from "axios";
import dayjs from 'dayjs';
import { howManyDaysFromToday } from "../utils/dates.util";
import { CinemaObject } from "../common/types";

export default async function run(date: string, cinema: CinemaObject) {
  const { additionalInfo: cinemaId } = cinema;
  const unifiedDate: string = dayjs(date).format("YYYY-MM-DD");
  const urlDay: number = howManyDaysFromToday(date);

  if (urlDay < 0 || urlDay > 7) {
    // Return unified object with empty array to prevent axios errors
    return { date: unifiedDate, city: cinema.city, type: cinema.type, cinema: cinema.cinema, movies: [] };
  } else {
    const result = await axios.get(`https://www.helios.pl/${cinemaId}/Repertuar/index/dzien/${urlDay}`);
    const $: cheerio.Root = load(result.data);
    // Parse the titles according to the page structure
    const titles: string[] = slice(split($(".movie-link").text(), "\n").map(info => trim(info)), 1);
    // Parse the times according to the page structure
    const infos = split($("div.time").text(), "\n").map(info => info.replace(/\t/g, '')).map(info => info.replace(/\*/g, '').match(/.{1,5}/g)).slice(-titles.length);
    if (infos.includes(null)) {
      // Return unified object with empty array to prevent weird behavior
      return { date: unifiedDate, city: cinema.city, type: cinema.type, cinema: cinema.cinema, movies: [] };
    } else {
      // Combine info and title arrays
      const zipped = zip(titles, infos);
      // New array for proper output format
      const movies: Object[] = [];
      for (const entry of zipped) {
        movies.push({ title: entry[0], time: entry[1] });
      }
      // Return unified object
      return { date: unifiedDate, city: cinema.city, type: cinema.type, cinema: cinema.cinema, movies: movies };
    }
  }
}
