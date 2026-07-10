import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello from TypeScript and Express!');
});

app.get('/api/quote/:symbol', async (req: Request, res: Response): Promise<void> => {
    try {
      const { symbol } = req.params;
      const response = await fetch(`${process.env.TRADIER_HOST}/markets/quotes?symbols=${symbol}&greeks=false`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.TRADIER_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch market data from Tradier' });
    }
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server is running on http://localhost:${process.env.PORT}.`);
});