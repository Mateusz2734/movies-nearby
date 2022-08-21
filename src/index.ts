import express, { Request, Response } from 'express';
import naStarowce from "./scrapers/naStarowce";

const PORT = 3000;

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const result = await naStarowce("http://kino.zory.pl/wydarzenia-2022-08-23.html");
  res.json({ movies: result });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});