import type { Application, Request, Response } from 'express';
import express from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript and Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});