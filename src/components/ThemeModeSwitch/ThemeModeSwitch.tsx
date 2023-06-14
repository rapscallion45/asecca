import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, Switch, Box, useTheme, styled } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { AppState } from '@/redux/store';
import { setTheme } from '@/redux/slices/themeSlice';

/**
 * Theme Mode Switch Style
 *
 * Application light/dark mode toggle switch styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.6
 *
 * @component
 * @return {Component} - styled theme mode switch
 */
const ThemeModeSwitchStyle = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
/**
 * Theme Mode Switch
 *
 * Styled toggle switch used for switching the global app theme
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.6
 *
 * @component
 * @returns {FC} - theme mode switch functional component
 */
const ThemeModeSwitch: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { type: themeType } = useSelector((state: AppState) => state.theme);

  /**
   * Callback that toggles global application theme
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.6
   *
   * @method
   */
  const toggleTheme = () => {
    dispatch(setTheme(themeType === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? '#272727' : theme.palette.grey[200],
        px: 5,
        py: 2,
        mx: 1,
        mt: 3,
        borderRadius: 1,
      }}
    >
      <LightModeIcon
        color={theme.palette.mode === 'dark' ? 'disabled' : 'secondary'}
      />
      <FormControlLabel
        data-testid="light-dark-btn"
        control={
          <ThemeModeSwitchStyle
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            checked={themeType === 'dark'}
            onChange={toggleTheme}
            sx={{ ml: 2.5, mr: -1 }}
            color="secondary"
          />
        }
        label=""
      />
      <DarkModeIcon
        color={theme.palette.mode === 'light' ? 'disabled' : 'secondary'}
      />
    </Box>
  );
};

export default ThemeModeSwitch;
