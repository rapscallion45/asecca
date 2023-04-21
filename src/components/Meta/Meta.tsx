import { FC } from 'react';
import { useTheme } from '@mui/material';

/**
 * Meta
 *
 * Applications meta data component for filling page Head element,
 * with app name, description, SEO, favicon, etc
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @returns {FC} - meta functional component
 */
const Meta: FC = () => {
  /* shorthand theme helper */
  const theme = useTheme();

  return (
    <>
      <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta
        name="description"
        content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color={theme.palette.primary.main}
      />
      <link rel="icon" href="/favicon/favicon.ico" />
      <meta
        name="msapplication-TileColor"
        content={theme.palette.primary.main}
      />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta
        name="apple-mobile-web-app-title"
        content={process.env.NEXT_PUBLIC_APP_NAME}
      />
      <meta
        name="application-name"
        content={process.env.NEXT_PUBLIC_APP_NAME}
      />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </>
  );
};

export default Meta;
