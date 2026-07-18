import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AuthProvider from './components/auth/AuthProvider.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </ThemeProvider>
);