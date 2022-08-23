import { zip } from "lodash";
import { load } from "cheerio";
import dayjs from 'dayjs';
import puppeteer from "puppeteer";

export default async function run(date: string) {
  const pageSpecificDate = dayjs(date).format("DD-MM-YYYY");
  const unifiedDate: string = dayjs(date).format("YYYY-MM-DD");
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 800,
      height: 1000
    }
  });
  const page: puppeteer.Page = await browser.newPage();
  await page.goto(`https://multikino.pl/repertuar/katowice/teraz-gramy/alfabetyczny?data=${pageSpecificDate}`);

  await page.waitForNetworkIdle();

  const html: string = await page.evaluate((): string => {
    return document.documentElement.innerHTML;
  });
  browser.close();

  let $: cheerio.Root = load(html);
  const titles: string[] = [];
  $('.filmlist').find('a.filmlist__title > span').each((_: number, element: cheerio.Element): void => {
    titles.push($(element).text());
  });

  const times: string[][] = [];
  $('.filmlist').find('.day__section').each((_: number, element: cheerio.Element): void => {
    const oneMovieTimes: string[] = [];
    $(element).find(".default").each((_: number, innerElement: cheerio.Element): void => {
      oneMovieTimes.push($(innerElement).text());
    });
    times.push(oneMovieTimes);
  });
  const zipped = zip(titles, times);
  const movies: Object[] = [];
  for (const entry of zipped) {
    movies.push({ title: entry[0], time: entry[1] });
  }
  return { date: unifiedDate, cinema: "Multikino Katowice", movies: movies };
}
