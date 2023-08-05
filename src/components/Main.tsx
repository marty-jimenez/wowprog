import { useState, useCallback } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { getWowToken } from '../apiRequest';
import Header from './Header';
import SideNav from './SideNav';
interface MainProps {
  token: string;
  handleDarkModeToggle: () => void;
}

const Main = ({ token, handleDarkModeToggle }: MainProps) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleSideNavOpen = useCallback(() => {
    setSideNavOpen(!sideNavOpen);
  }, [sideNavOpen]);
  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        handleDarkModeToggle={handleDarkModeToggle}
        handleSideNavOpen={handleSideNavOpen}
        sideNavOpen={sideNavOpen}
      />
      <SideNav
        handleSideNavOpen={handleSideNavOpen}
        sideNavOpen={sideNavOpen}
      />
      <Grid container className="App">
        {token && (
          <Button
            variant="contained"
            onClick={async () => await getWowToken(token)}
          >
            wow token
          </Button>
        )}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Grid>
    </Box>
  );
};

export default Main;
