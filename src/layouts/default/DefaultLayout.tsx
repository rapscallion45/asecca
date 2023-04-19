import { FC, ReactNode } from 'react';
import useNotifier from '@/hooks/useNotifier';

/**
 * Default Fallback Page Layout Props
 *
 * @since - 0.0.0
 *
 * @typedef IDefaultLayoutProps
 * @prop {ReactNode} children - component children nodes
 */
interface IDefaultLayoutProps {
  children?: ReactNode;
}

/**
 * Default Fallback Page Layout
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 *
 * @param {IDefaultLayoutProps} props - component props
 * @returns {FC} - default layout functional component
 */
const DefaultLayout: FC<IDefaultLayoutProps> = (props) => {
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
