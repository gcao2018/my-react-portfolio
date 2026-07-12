import { Paper } from '@mui/material';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  return <Paper>
    <div className='greeting'>Hi! I'm George, a web developer. Welcome to my website.</div>
  </Paper>;
}