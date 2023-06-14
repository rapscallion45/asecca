import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Drawer, useTheme } from '@mui/material';
import { SIDEBAR_DRAWER_WIDTH } from '@/constants/constants';
import ScrollBar from '@/components/ScrollBar/ScrollBar';
import NavSection from '@/components/NavSection/NavSection';
import ThemeModeSwitch from '@/components/ThemeModeSwitch/ThemeModeSwitch';
import MHidden from '@/components/@MUI-Extended/MHidden';
import sideBarConfig from './dashboardSideBarItems';
import { IDashboardSidebarOnCloseCallback } from './types';

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
    width: SIDEBAR_DRAWER_WIDTH,
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
 * @prop {IDashboardSidebarOnCloseCallback} onCloseSidebar - sidebar close callback
 */
interface IDashboardSideBarProps {
  isOpenSidebar?: boolean;
  onCloseSidebar?: IDashboardSidebarOnCloseCallback;
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
  const theme = useTheme();

  useEffect(() => {
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  }, [pathname, onCloseSidebar]);

  /**
   * Sidebar Content
   *
   * Sidebar content area renderer helper component
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @component
   * @returns {Component} - sidebar content component
   */
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
          {theme.palette.mode === 'dark' && (
            <Box width={150} component="img" src="/logowhite.webp" />
          )}
          {theme.palette.mode === 'light' && (
            <Box width={150} component="img" src="/logoblack.webp" />
          )}
        </Box>
      </Box>
      <NavSection navConfig={sideBarConfig} />
      <Box display="flex" p={5}>
        <ThemeModeSwitch />
      </Box>
    </ScrollBar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: SIDEBAR_DRAWER_WIDTH },
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
            sx: { width: SIDEBAR_DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

export default DashboardSideBar;
