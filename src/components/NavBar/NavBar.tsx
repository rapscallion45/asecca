import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';

/* App NavBar */
/* ========== */
const NavBar: FC = () => (
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
        <Button variant="outlined" color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default NavBar;
