import type {
  NextPage,
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from 'next';
import type { AppProps } from 'next/app';

/* extend NextPage and NextComponentType to include our custom Layout prop */
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

/* extend AppProps to include our customised NextComponentType with Layout prop */
declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}
