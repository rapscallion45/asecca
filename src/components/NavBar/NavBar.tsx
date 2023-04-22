import { FC } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';

/**
 * NavBar Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IErrorRowProps
 * @prop {boolean} showLogin - flag to show or hide login button
 */
interface INavBarProps {
  showLogin?: boolean;
}

/**
 * NavBar
 *
 * Application main Navbar component
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {INavBarProps} props - component props
 * @returns {FC} - navbar functional component
 */
const NavBar: FC<INavBarProps> = (props) => {
  const { showLogin = false } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ border: 'none', boxShadow: 'none', padding: '12px 54px' }}
      >
        <Toolbar>
          <Image
            src="/logowhite-02.webp"
            alt="Asecca logo"
            width={395}
            height={40}
          />
          <Box sx={{ flexGrow: 1 }} />
          {showLogin && (
            <Button
              component={Link}
              href="/"
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
