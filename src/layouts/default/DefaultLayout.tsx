import { FC, ReactNode } from 'react';

interface DefaultLayoutProps {
  children?: ReactNode;
}

/* Default Fallback Page Layout */
/* ============================ */
const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main>
      <section id="page-content">{children}</section>
    </main>
  );
};

export default DefaultLayout;
