import * as React from 'react';
import { NextLayoutComponentType } from 'next';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createEmotionCache } from '@/utils';
import lightThemeOptions from '@/styles/theme/lightThemeOptions';
import DefaultLayout from '@/layouts/default/DefaultLayout';

/* initialise client MUI styles cache */
const clientSideEmotionCache = createEmotionCache();

/* initialise the ASECCA light theme styles */
const lightTheme = createTheme(lightThemeOptions);

interface AseccaAppProps extends AppProps {
  Component: NextLayoutComponentType;
  emotionCache?: EmotionCache;
}

/* Asecca SPA entry point */
/* ====================== */
const AseccaApp: React.FunctionComponent<AseccaAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  /* the page layout is defined in each page's definition, else default */
  const PageLayout = Component.Layout || DefaultLayout;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AseccaApp;
