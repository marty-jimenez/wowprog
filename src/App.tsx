import { useState } from 'react';
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

function App() {
  const [token, setToken] = useState('');
  // TODO: commit to localestorage as well
  const [darkMode, setDarkMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)')
  );
  /* TODO: 
    make a custom form component page to submit things like client_id, client_secret, realmSlug, characterName
  */
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#222222' : '#9fa0a4'
      }
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
              <Main
                token={token}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
