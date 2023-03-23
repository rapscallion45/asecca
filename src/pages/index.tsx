import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeLayout from '@/layouts/home/HomeLayout';

/* Placeholder Home Page */
/* ===================== */
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
      <Avatar sx={{ m: 3, bgcolor: 'primary.main', p: 4 }}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5" color="common.white">
        Log In
      </Typography>
      <Button
        component={Link}
        href="/dashboard/config-costs"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log In
      </Button>
    </Box>
  </Container>
);

/* home layout used for Home page */
Home.Layout = HomeLayout;

export default Home;
