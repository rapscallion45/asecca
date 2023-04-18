import { FC, ReactNode } from 'react';
import useNotifier from '@/hooks/useNotifier';

interface DefaultLayoutProps {
  children?: ReactNode;
}

/**
 * Default Fallback Page Layout
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - component children
 * @returns {FC} - default layout functional component
 * @type {( props : DashboardLayoutProps)}
 */
const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  const { children } = props;

  /** initialise alert notifications */
  useNotifier();

  return (
    <main>
      <section id="page-content">{children}</section>
    </main>
  );
};

export default DefaultLayout;
