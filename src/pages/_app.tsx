import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createEmotionCache } from '@/utils';
import lightThemeOptions from '@/styles/theme/lightThemeOptions';

/* initialise client MUI styles cache */
const clientSideEmotionCache = createEmotionCache();

/* initialise the ASECCA light theme styles */
const lightTheme = createTheme(lightThemeOptions);

interface AseccaAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

/* Asecca SPA entry point */
/* ====================== */
const AseccaApp: React.FunctionComponent<AseccaAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AseccaApp;
