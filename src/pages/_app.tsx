import { NextLayoutComponentType } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createEmotionCache } from '@/utils';
import store from '@/redux/store';
import DefaultLayout from '@/layouts/default/DefaultLayout';
import AlertProvider from '@/components/AlertProvider/AlertProvider';
import ThemeConfig from '@/styles/theme/ThemeConfig';

/* initialise client MUI styles cache */
const clientSideEmotionCache = createEmotionCache();

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
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeConfig emotionCache={emotionCache}>
          <AlertProvider>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </AlertProvider>
        </ThemeConfig>
      </CacheProvider>
    </Provider>
  );
};

export default AseccaApp;
