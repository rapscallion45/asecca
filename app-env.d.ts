import type {
  NextPage,
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from 'next';
import type { AppProps } from 'next/app';

/**
 * extend NextPage and NextComponentType to include our custom Layout prop
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    Layout: ReactNode;
  };

  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    Layout: ReactNode;
  };
}

/**
 * extend AppProps to include our customised NextComponentType with Layout prop
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}
