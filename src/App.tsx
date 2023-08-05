import { useState, useCallback } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import './App.css';
import Main from './components/Main';
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
      <Main handleDarkModeToggle={handleDarkModeToggle} />
    </ThemeProvider>
  );
}

export default App;
