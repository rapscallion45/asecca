import { FC, useMemo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  Theme,
  ThemeOptions,
  PaletteOptions,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppState } from '@/redux/store';
import lightThemePalette from './lightTheme/lightThemePalette';
import darkThemePalette from './darkTheme/darkThemePalette';
import typography from './typography';

interface ThemeConfigProps {
  emotionCache: EmotionCache;
  children?: ReactNode;
}

/**
 * Theme Config
 *
 * Global application theme definitions and setup
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - emotion cache and component children
 * @returns {FC} - theme config HOC
 * @type {(props : ThemeConfigProps)}
 */
const ThemeConfig: FC<ThemeConfigProps> = (props) => {
  const { emotionCache, children } = props;

  /** grab global theme state */
  const { theme: themeSelection } = useSelector(
    (state: AppState) => state.theme
  );

  /** check if user has dark mode preference */
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  /** get options and create theme for current state */
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette:
        themeSelection.type === 'light' && !prefersDarkMode
          ? (lightThemePalette as PaletteOptions)
          : (darkThemePalette as PaletteOptions),
      typography,
    }),
    [themeSelection, prefersDarkMode]
  );
  const theme: Theme = createTheme(themeOptions);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeConfig;
