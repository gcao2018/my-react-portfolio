import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload, type VerifyErrors } from 'jsonwebtoken';

interface LoginCredentials {
  username: string;
  password: string;
  email: string;
}

interface UserPayload extends JwtPayload {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  watchlist?: string[];
}

interface VerifyRequest extends Request {
  userData: UserPayload;
}

const app: Application = express();
app.use(express.json());
app.use(cors());

// mock users database
const users: UserPayload[] = [
  {
    id: 1,
    email: process.env.MOCK_EMAIL as string,
    username: process.env.MOCK_USERNAME as string,
    passwordHash: process.env.MOCK_PASSWORD_HASH as string
  },
  {
    id: 2,
    email: process.env.MOCK_EMAIL_2 as string,
    username: process.env.MOCK_USERNAME_2 as string,
    passwordHash: process.env.MOCK_PASSWORD_HASH_2 as string
  }
];

app.post('/api/auth/login', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password }: LoginCredentials = req.body;
  const user: UserPayload | undefined = users.find(
    (user: UserPayload): boolean => username === user.username && email === user.email
  );
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const isPasswordValid: boolean = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: 'Authentication key is missing on the server' });
    return;
  }
  const token: string = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ message: 'Login successful', token });
});

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Access token required' });
  } else if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: 'Authentication key is missing on the server' });
  } else {
    try {
      const decoded: UserPayload = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
      (req as VerifyRequest).userData = decoded;
      next();
    } catch {
      res.status(403).json({ error: 'Invalid token' });
    }
  }
};

app.post('/api/auth/verify', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  const userData: UserPayload = (req as VerifyRequest).userData;
  res.status(200).json({
    id: userData.id,
    username: userData.username,
    email: userData.email
  });
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
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});