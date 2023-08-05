import { styled, Theme, CSSObject } from '@mui/material/styles';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  GitHub,
  LinkedIn,
  Storage,
  Portrait
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const sideNavOpened = (theme: Theme): CSSObject => ({
  width: theme.customValues?.sideNavWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const sideNavClosed = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below header
  ...theme.mixins.toolbar
}));

// custom side nav component
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: theme.customValues?.sideNavWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...sideNavOpened(theme),
    '& .MuiDrawer-paper': sideNavOpened(theme)
  }),
  ...(!open && {
    ...sideNavClosed(theme),
    '& .MuiDrawer-paper': sideNavClosed(theme)
  })
}));

interface SideNavProps {
  handleSideNavOpen: () => void; // required
  sideNavOpen: boolean; // required
}
const SideNav = ({ handleSideNavOpen, sideNavOpen }: SideNavProps) => {
  return (
    <Drawer variant="permanent" open={sideNavOpen}>
      <DrawerHeader>
        <IconButton
          aria-label="open side navigation"
          onClick={handleSideNavOpen}
        >
          {sideNavOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            aria-label="home button"
            to="/"
            sx={{
              minHeight: 48,
              justifyContent: sideNavOpen ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sideNavOpen ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <Home />
            </ListItemIcon>
            {sideNavOpen && <ListItemText>Home</ListItemText>}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            aria-label="profile button"
            to="/profile"
            sx={{
              minHeight: 48,
              justifyContent: sideNavOpen ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sideNavOpen ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <Portrait />
            </ListItemIcon>
            {sideNavOpen && <ListItemText>Character Profile</ListItemText>}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            aria-label="home button"
            to="/logs"
            sx={{
              minHeight: 48,
              justifyContent: sideNavOpen ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sideNavOpen ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <Storage />
            </ListItemIcon>
            {sideNavOpen && <ListItemText>Logs</ListItemText>}
          </ListItemButton>
        </ListItem>
      </List>
      {/* FOOTER */}
      <List style={{ marginTop: `auto` }}>
        <Divider />
        <ListItem disablePadding sx={{ paddingTop: '8px' }}>
          <ListItemButton
            component={Link}
            aria-label="github button"
            to="https://github.com/marty-jimenez"
            target="_blank"
            sx={{
              minHeight: 48,
              justifyContent: sideNavOpen ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sideNavOpen ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <GitHub />
            </ListItemIcon>
            {sideNavOpen && <ListItemText>GitHub</ListItemText>}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            aria-label="linkedin button"
            to="https://linkedin.com/in/martinjimenezjr/"
            target="_blank"
            sx={{
              minHeight: 48,
              justifyContent: sideNavOpen ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sideNavOpen ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <LinkedIn />
            </ListItemIcon>
            {sideNavOpen && <ListItemText>LinkedIn</ListItemText>}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
export default SideNav;
