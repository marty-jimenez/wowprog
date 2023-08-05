import { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import SideNav from './SideNav';
import MainRouter from './MainRouter';
import ClientLogin from './ClientLogin';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
interface MainProps {
  handleDarkModeToggle: () => void;
}

const Main = ({ handleDarkModeToggle }: MainProps) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [token, setToken] = useState('');

  const handleSideNavOpen = useCallback(() => {
    setSideNavOpen(!sideNavOpen);
  }, [sideNavOpen]);

  return (
    <Box sx={{ display: 'flex', height: '100%', marginTop: '70px' }}>
      <Router>
        {!token ? (
          <>
            <Navigate replace to="/" />
            <ClientLogin setToken={setToken} />
          </>
        ) : (
          <>
            <Header
              handleDarkModeToggle={handleDarkModeToggle}
              handleSideNavOpen={handleSideNavOpen}
              sideNavOpen={sideNavOpen}
            />
            <SideNav
              handleSideNavOpen={handleSideNavOpen}
              sideNavOpen={sideNavOpen}
            />
            <MainRouter token={token} />
          </>
        )}
      </Router>
    </Box>
  );
};

export default Main;
