import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
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
const RootStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
  },
}));

/**
 * Dashboard Sidebar Styled Drawer
 *
 * Application dashboard sidebar drawer component styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.12
 *
 * @component
 * @return {Component} - styled dashboard sidebar component
 */
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: SIDEBAR_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
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

  /* close sidebar if change of URL */
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
    <>
      <MHidden width="lgUp">
        <Box sx={{ mt: 1, py: 3, pr: 3, pl: 7 }}>
          <Box component={Link} href="/" sx={{ px: 2, display: 'inline-flex' }}>
            {theme.palette.mode === 'dark' && (
              <Box width={150} component="img" src="/logowhite.webp" />
            )}
            {theme.palette.mode === 'light' && (
              <Box width={150} component="img" src="/logoblack.webp" />
            )}
          </Box>
        </Box>
      </MHidden>
      <NavSection navConfig={sideBarConfig} />
      <Box mt={2} mb={1}>
        <ThemeModeSwitch collapsed={!isOpenSidebar} />
      </Box>
    </>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <ScrollBar>
          <Drawer
            open={isOpenSidebar}
            onClose={onCloseSidebar}
            PaperProps={{
              sx: { width: SIDEBAR_DRAWER_WIDTH },
            }}
          >
            {renderContent}
          </Drawer>
        </ScrollBar>
      </MHidden>

      <MHidden width="lgDown">
        <ScrollBar>
          <StyledDrawer variant="permanent" open={isOpenSidebar}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                mr: 1,
              }}
            >
              <IconButton onClick={onCloseSidebar}>
                {isOpenSidebar ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">{renderContent}</List>
          </StyledDrawer>
        </ScrollBar>
      </MHidden>
    </RootStyle>
  );
};

export default DashboardSideBar;
