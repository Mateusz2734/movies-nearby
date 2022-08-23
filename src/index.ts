import express, { Request, Response } from 'express';
import naStarowce from "./scrapers/naStarowce";
import helios from "./scrapers/helios";
import multikino from "./scrapers/multikino";

const PORT = 4000;

const app = express();

// These routes exist only for development purposes
app.get('/starowka', async (req: Request, res: Response) => {
  const result = await naStarowce("2022-12-20");
  res.json(result);
});

app.get('/helios', async (req: Request, res: Response) => {
  const result = await helios("2022-07-30");
  res.json(result);
});

app.get("/multikino", async (req: Request, res: Response) => {
  const result = await multikino("2022-08-27");
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});