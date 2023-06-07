import { FC } from 'react';
import { NextLayoutComponentType } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@/styles/ag-grid-theme-asecca/ag-theme-asecca.css';
import '@/styles/ag-grid-theme-asecca/ag-theme-asecca-dark.css';

import { createEmotionCache } from '@/utils';
import store from '@/redux/store';
import DefaultLayout from '@/layouts/default/DefaultLayout';
import AlertProvider from '@/components/AlertProvider/AlertProvider';
import ThemeConfig from '@/styles/theme/ThemeConfig';

/**
 * initialise client MUI styles cache
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
const clientSideEmotionCache = createEmotionCache();

/**
 * Asecca SPA Entry Point Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IAseccaAppProps
 * @extends AppProps
 * @prop {NextLayoutComponentType} Component - intial component for app to render
 * @prop {EmotionCache} emotionCache - emotion styling engine cache
 */
interface IAseccaAppProps extends AppProps {
  Component: NextLayoutComponentType;
  emotionCache?: EmotionCache;
}

/**
 * Asecca SPA Entry Point
 *
 * Entry point of the application. Sets up all state and theme providers, layout,
 * and renders requested page.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IAseccaAppProps} props - app props
 * @returns {FC} - application entry point functional component
 */
const AseccaApp: FC<IAseccaAppProps> = (props) => {
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
