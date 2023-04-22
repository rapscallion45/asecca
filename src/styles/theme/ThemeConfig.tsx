import { FC, useMemo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  Theme,
  ThemeOptions,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppState } from '@/redux/store';
import lightThemePalette from './lightTheme/lightThemePalette';
import darkThemePalette from './darkTheme/darkThemePalette';
import typography from './typography';

/**
 * Theme Config Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @see See [more info on creating emotion styling engine cache](https://emotion.sh/docs/introduction)
 *
 * @typedef IThemeConfigProps
 * @prop {EmotionCache} emotionCache - emotion styling engine cache
 * @prop {ReactNode} children - component child node
 */
interface IThemeConfigProps {
  emotionCache: EmotionCache;
  children?: ReactNode;
}

/**
 * Theme Config
 *
 * Global application theme definitions and setup
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IThemeConfigProps} props - component props
 * @returns {FC} - theme config functional component
 */
const ThemeConfig: FC<IThemeConfigProps> = (props) => {
  const { emotionCache, children } = props;

  /* grab global theme state */
  const { type: themeType } = useSelector((state: AppState) => state.theme);

  /* check if user has dark mode preference */
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  /* get options and create theme for current state */
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette:
        themeType === 'light' && !prefersDarkMode
          ? lightThemePalette
          : darkThemePalette,
      typography,
    }),
    [themeType, prefersDarkMode]
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
