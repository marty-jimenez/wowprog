import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import ClientLogin from './components/ClientLogin';
import Main from './components/Main';
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

// TODO: make a mainrouter component to remove this logic from here, theming should probably be done in Main and not App
function App() {
  const [token, setToken] = useState('');
  // TODO: commit to localestorage as well
  const [darkMode, setDarkMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)')
  );
  const handleDarkModeToggle = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  /* TODO: 
    make a custom form component page to submit things like client_id, client_secret, realmSlug, characterName
  */
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
  if (!token) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ClientLogin setToken={setToken} />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Main token={token} handleDarkModeToggle={handleDarkModeToggle} />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
