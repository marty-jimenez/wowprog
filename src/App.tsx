import { useState, useCallback } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import ClientLogin from './components/ClientLogin';
import MainRouter from './components/MainRouter';
import './App.css';
// custom theme components
declare module '@mui/material/styles' {
  interface Theme {
    customValues?: {
      sideNavWidth?: number;
    };
  }
  interface ThemeOptions {
    customValues?: {
      sideNavWidth?: number;
    };
  }
}

function App() {
  const [token, setToken] = useState('');
  const [darkMode, setDarkMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)')
  );

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#222222' : '#9fa0a4'
      }
    },
    customValues: {
      sideNavWidth: 275
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {token ? (
        <MainRouter token={token} handleDarkModeToggle={handleDarkModeToggle} />
      ) : (
        <ClientLogin setToken={setToken} />
      )}
    </ThemeProvider>
  );
}

export default App;
