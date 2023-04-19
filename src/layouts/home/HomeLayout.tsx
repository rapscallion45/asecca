import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import NavBar from '@/components/NavBar/NavBar';
import useNotifier from '@/hooks/useNotifier';

/**
 * background styling
 *
 * @since - 0.0.0
 */
const BackgroundStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  backgroundColor: theme.palette.grey[400],
}));

/**
 * root style for the dashboard page content
 *
 * @since - 0.0.0
 */
const RootStyle = styled('section')({
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
 * @since - 0.0.0
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
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param {IHomeLayoutProps} props - component props
 * @returns {FC} - home page layout functional component
 */
const DashboardLayout: FC<IHomeLayoutProps> = (props) => {
  const { children } = props;

  /** initialise alert notifications */
  useNotifier();

  return (
    <main id="home-page">
      <BackgroundStyle id="background" />
      <NavBar />
      <RootStyle id="page-content">{children}</RootStyle>
    </main>
  );
};

export default DashboardLayout;
