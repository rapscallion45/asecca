import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeLayout from '@/layouts/home/HomeLayout';

/**
 * Home Page
 *
 * Home page of the Asecca front end client application.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @returns {NextPageWithLayout} - application homepage
 */
const Home: NextPageWithLayout = () => (
  <Container maxWidth="xs">
    <Box
      sx={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 3, bgcolor: 'secondary.main', p: 4 }}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5" color="common.white">
        Log In
      </Typography>
      <Button
        component={Link}
        href="/dashboard/costs-config"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mt: 4, mb: 2 }}
      >
        Log In
      </Button>
    </Box>
  </Container>
);

/** home layout used for Home page */
Home.Layout = HomeLayout;

export default Home;
