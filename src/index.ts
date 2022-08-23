import express, { Request, Response } from 'express';
import { connectWithDatabase } from "./db/connect";
import naStarowce from "./scrapers/naStarowce";
import helios from "./scrapers/helios";
import multikino from "./scrapers/multikino";
import cinemaCity from "./scrapers/cinemaCity";

const PORT = 4000;

const app = express();

// These routes exist only for development purposes
app.get("/", async (req: Request, res: Response) => {
  const result1 = await naStarowce("2022-08-25");
  const result2 = await helios("2022-08-25");
  const result3 = await multikino("2022-08-25");
  const result4 = await cinemaCity("2022-08-25");


  res.json([result1, result2, result3, result4]);
});

app.get('/starowka', async (req: Request, res: Response) => {
  const result = await naStarowce("2022-08-25");
  res.json(result);
});

app.get('/helios', async (req: Request, res: Response) => {
  const result = await helios("2022-08-25");
  res.json(result);
});

app.get("/multikino", async (req: Request, res: Response) => {
  const result = await multikino("2022-08-25");
  res.json(result);
});

app.get("/cinema-city", async (req: Request, res: Response) => {
  const result = await cinemaCity("2022-08-25");
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
  connectWithDatabase();
});