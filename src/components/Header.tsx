import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Switch, IconButton, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: theme.customValues?.sideNavWidth,
    width: `calc(100% - ${theme.customValues?.sideNavWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

interface HeaderProps {
  handleDarkModeToggle: () => void;
  handleSideNavOpen: () => void;
  sideNavOpen: boolean;
}
const Header = ({
  handleDarkModeToggle,
  handleSideNavOpen,
  sideNavOpen
}: HeaderProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={sideNavOpen}>
        <Toolbar
          style={{ justifyContent: sideNavOpen ? 'flex-end' : 'space-between' }}
        >
          <IconButton
            aria-label="open side navigation"
            edge="start"
            onClick={handleSideNavOpen}
            sx={{
              marginRight: 5,
              ...(sideNavOpen && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Switch defaultChecked onChange={handleDarkModeToggle} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
