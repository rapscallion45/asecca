import { FC, ReactNode } from 'react';
import useNotifier from '@/hooks/useNotifier';

interface DefaultLayoutProps {
  children?: ReactNode;
}

/* Default Fallback Page Layout */
/* ============================ */
const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  const { children } = props;

  /* initialise alert notifications */
  useNotifier();

  return (
    <main>
      <section id="page-content">{children}</section>
    </main>
  );
};

export default DefaultLayout;
