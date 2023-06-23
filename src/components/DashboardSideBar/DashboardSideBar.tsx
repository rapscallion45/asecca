import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Drawer, useTheme } from '@mui/material';
import { SIDEBAR_DRAWER_WIDTH } from '@/constants/constants';
import ScrollBar from '@/components/ScrollBar/ScrollBar';
import NavSection from '@/components/NavSection/NavSection';
import ThemeModeSwitch from '@/components/ThemeModeSwitch/ThemeModeSwitch';
import sideBarConfig from './dashboardSideBarItems';
import { IDashboardSidebarOnCloseCallback } from './types';

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
    <ScrollBar>
      <Box sx={{ mt: 1, px: 2.5, py: 3 }}>
        <Box
          component={Link}
          href="/"
          sx={{ px: 2, display: 'flex', justifyContent: 'center' }}
        >
          {theme.palette.mode === 'dark' && (
            <Box width={150} component="img" src="/logowhite.webp" />
          )}
          {theme.palette.mode === 'light' && (
            <Box width={150} component="img" src="/logoblack.webp" />
          )}
        </Box>
      </Box>
      <NavSection navConfig={sideBarConfig} />
      <Box mt={2} mb={1}>
        <ThemeModeSwitch />
      </Box>
    </ScrollBar>
  );

  return (
    <Drawer
      open={isOpenSidebar}
      onClose={onCloseSidebar}
      PaperProps={{
        sx: { width: SIDEBAR_DRAWER_WIDTH },
      }}
    >
      {renderContent}
    </Drawer>
  );
};

export default DashboardSideBar;
