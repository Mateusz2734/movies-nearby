import { zip, trim } from "lodash";
import { load } from "cheerio";
import dayjs from "dayjs";
import puppeteer from "puppeteer";
import { CinemaObject, MovieObject } from "../common/types";

export default async function run(date: string, cinema: CinemaObject) {
  const { additionalInfo: cinemaId } = cinema;
  const unifiedDate: string = dayjs(date).format("YYYY-MM-DD");
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 800,
      height: 1000,
    },
  });
  const page: puppeteer.Page = await browser.newPage();
  await page.goto(
    `https://www.cinema-city.pl/kina/punkt44/1065#/buy-tickets-by-cinema?in-cinema=${cinemaId}&at=${unifiedDate}&view-mode=list`
  );
  await page.waitForNetworkIdle();
  const html: string = await page.evaluate((): string => {
    return document.documentElement.innerHTML;
  });
  browser.close();

  let $: cheerio.Root = load(html);
  const titles: string[] = [];
  $(".qb-list-by-list")
    .find("a.qb-movie-link > h3.qb-movie-name")
    .each((_: number, element: cheerio.Element): void => {
      titles.push(trim($(element).text()));
    });

  const times: string[][] = [];
  $(".qb-list-by-list")
    .find(".events")
    .each((_: number, element: cheerio.Element): void => {
      const oneMovieTimes: string[] = [];
      $(element)
        .find("div > a.btn")
        .each((_: number, innerElement: cheerio.Element): void => {
          oneMovieTimes.push(trim($(innerElement).text()));
        });
      times.push(oneMovieTimes);
    });
  const zipped = zip(titles, times);
  const movies: MovieObject[] = [];
  for (const entry of zipped) {
    movies.push({ title: entry[0] as string, time: entry[1] as string[] });
  }
  return {
    date: unifiedDate,
    city: cinema.city,
    type: cinema.type,
    cinema: cinema.cinema,
    movies: movies,
  };
}
