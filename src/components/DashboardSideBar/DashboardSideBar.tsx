import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import ScrollBar from '../ScrollBar/ScrollBar';
import NavSection from '../NavSection/NavSection';
import MHidden from '../@MUI-Extended/MHidden';
import sideBarConfig from './dashboardSideBarItems';

const DRAWER_WIDTH = 280;

/**
 * Dashboard Sidebar Root Style
 *
 * Application dashboard layout root component styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled dashboard layout root component
 */
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

/**
 * Dashboard Sidebar Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IDashboardSideBarProps
 * @prop {boolean} isOpenSidebar - sidebar open flag
 * @prop {() => void} onCloseSidebar - sidebar close callback
 */
interface IDashboardSideBarProps {
  isOpenSidebar?: boolean;
  onCloseSidebar?: () => void;
}

/**
 * Dashboard Sidebar
 *
 * Global dashboard sidebar component
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IDashboardSideBarProps} props - component props
 * @returns {FC} - dashboard sidebar component
 */
const DashboardSideBar: FC<IDashboardSideBarProps> = (props) => {
  const { isOpenSidebar, onCloseSidebar } = props;
  const { pathname } = useRouter();

  useEffect(() => {
    if (!isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
  }, [pathname, isOpenSidebar, onCloseSidebar]);

  const renderContent = (
    <ScrollBar
      sx={{
        height: '100%',
        overflowY: 'auto',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        '& .simplebar-placeholder': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ mt: 1, px: 2.5, py: 3 }}>
        <Box component={Link} href="/" sx={{ px: 2, display: 'inline-flex' }}>
          <Box width={150} component="img" src="/logoblack.webp" />
        </Box>
      </Box>
      <NavSection navConfig={sideBarConfig} />
    </ScrollBar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

export default DashboardSideBar;
