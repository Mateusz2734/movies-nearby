import puppeteer, { Browser } from "puppeteer";
import { zip, trim } from "lodash";
import { load } from "cheerio";
import dayjs from "dayjs";
import { CinemaObject, MovieObject } from "../common/types";

export default async function run(date: string, cinema: CinemaObject) {
  const { additionalInfo: cinemaName } = cinema;
  const pageSpecificDate: string = dayjs(date).format("DD-MM-YYYY");
  const unifiedDate: string = dayjs(date).format("YYYY-MM-DD");

  const browser: Browser = await puppeteer.launch({
    defaultViewport: {
      width: 800,
      height: 1000,
    },
  });
  const page: puppeteer.Page = await browser.newPage();
  await page.goto(
    `https://multikino.pl/repertuar/${cinemaName}/teraz-gramy/alfabetyczny?data=${pageSpecificDate}`
  );

  await page.waitForNetworkIdle();

  const html: string = await page.evaluate((): string => {
    return document.documentElement.innerHTML;
  });
  browser.close();

  let $: cheerio.Root = load(html);
  const titles: string[] = [];
  $(".filmlist")
    .find("a.filmlist__title > span")
    .each((_: number, element: cheerio.Element): void => {
      titles.push(trim($(element).text()));
    });

  const times: string[][] = [];
  $(".filmlist")
    .find(".day__section")
    .each((_: number, element: cheerio.Element): void => {
      const oneMovieTimes: string[] = [];
      $(element)
        .find(".default")
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
