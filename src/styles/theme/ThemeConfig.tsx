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
import { AppState } from '@/redux/store';
import lightThemePalette from './lightTheme/lightThemePalette';
import darkThemePalette from './darkTheme/darkThemePalette';
import typography from './typography';

interface ThemeConfigProps {
  emotionCache: EmotionCache;
  children?: ReactNode;
}

/* Theme Config */
/* ============ */
const ThemeConfig: FC<ThemeConfigProps> = (props) => {
  const { emotionCache, children } = props;

  /* grab global theme state */
  const { theme: themeSelection } = useSelector(
    (state: AppState) => state.theme
  );

  /* get options and create theme for current state */
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette:
        themeSelection.type === 'light' ? lightThemePalette : darkThemePalette,
      typography,
    }),
    [themeSelection]
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
