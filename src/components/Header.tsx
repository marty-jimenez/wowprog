import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Switch } from '@mui/material';
import { useCallback } from 'react';
interface HeaderProps {
  darkMode: boolean; // required
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; // required
}
const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <Switch defaultChecked onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
