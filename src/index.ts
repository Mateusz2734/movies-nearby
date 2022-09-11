import express, { Request, Response } from "express";
import { startBackgroundScraping } from "./services/background.service";
import { connectWithDatabase } from "./db/connect";
import cinemaCity from "./scrapers/cinemaCity";
import naStarowce from "./scrapers/naStarowce";
import multikino from "./scrapers/multikino";
import helios from "./scrapers/helios";
import mainFlowHandler from "./controllers/mainFlow.controller";

const PORT = 4000;

const app = express();

app.use(express.json());

// These routes exist only for development purposes
app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Welcome" });
});

app.get("/starowka", async (req: Request, res: Response) => {
  const result = await naStarowce("2022-08-27");
  res.json(result);
});

app.get("/helios", async (req: Request, res: Response) => {
  const result = await helios("2022-08-28", {
    city: "Żory",
    type: "Helios",
    cinema: "Helios Żory",
    lon: 18.703087153668747,
    lat: 50.04526975763794,
    additionalInfo: 64,
  });
  res.json(result);
});

app.get("/multikino", async (req: Request, res: Response) => {
  const result = await multikino("2022-08-27", {
    city: "Rybnik",
    type: "Multikino",
    cinema: "Multikino Rybnik",
    lon: 18.543207710305587,
    lat: 50.09437565527905,
    additionalInfo: "rybnik",
  });
  res.json(result);
});

app.get("/cinema-city", async (req: Request, res: Response) => {
  const result = await cinemaCity("2022-08-27", {
    city: "Katowice",
    type: "Cinema City",
    cinema: "Cinema City Katowice Silesia",
    lon: 19.00215585120842,
    lat: 50.27064515361989,
    additionalInfo: 1079,
  });
  res.json(result);
});

app.get("/main", mainFlowHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
  startBackgroundScraping();
  connectWithDatabase("Main process");
});
