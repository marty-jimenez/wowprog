import { Button, Grid } from '@mui/material';
import { getWowToken } from '../apiRequest';
import Header from './Header';

interface MainProps {
  token: string; // required
  darkMode: boolean; // required
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; // required
}

const Main = ({ token, darkMode, setDarkMode }: MainProps) => {
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Grid container className="App">
        {token && (
          <Button
            variant="contained"
            onClick={async () => await getWowToken(token)}
          >
            wow token price
          </Button>
        )}
      </Grid>
    </>
  );
};

export default Main;
