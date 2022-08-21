import express, { Request, Response } from 'express';

const PORT = 3000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});