import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import NavBar from '@/components/NavBar/NavBar';
import useNotifier from '@/hooks/useNotifier';

/**
 * Home Background Style
 *
 * Application home layout background component styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @return {Component} - styled home layout background component
 */
const HomeBackgroundStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  backgroundColor: theme.palette.grey[400],
}));

/**
 * Home Root Style
 *
 * Home page root styling for page content
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @return {Component} - styled home layout root component
 */
const HomeRootStyle = styled('section')({
  display: 'flex',
  position: 'relative',
  minHeight: '100vh',
  minWidth: '100%',
  overflow: 'hidden',
  paddingTop: '100px',
});

/**
 * Home Page Layout Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IHomeLayoutProps
 * @prop {ReactNode} children - component children nodes
 */
interface IHomeLayoutProps {
  children?: ReactNode;
}

/**
 * Home Page Layout
 *
 * Home Page layout styling and functionality
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IHomeLayoutProps} props - component props
 * @returns {FC} - home page layout functional component
 */
const HomeLayout: FC<IHomeLayoutProps> = (props) => {
  const { children } = props;

  /* initialise alert notifications */
  useNotifier();

  return (
    <main id="home-page">
      <HomeBackgroundStyle id="background" />
      <NavBar />
      <HomeRootStyle id="page-content">{children}</HomeRootStyle>
    </main>
  );
};

export default HomeLayout;
