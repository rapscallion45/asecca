import { FC, ReactNode } from 'react';
import SimpleBarReact from 'simplebar-react';

/**
 * Scrollbar Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IScrollBarProps
 * @prop {ReactNode} children - component children nodes
 * @prop {any} other - component props to passed through to children
 */
interface IScrollBarProps {
  children: ReactNode;
  other?: any;
}

/**
 * Scrollbar
 *
 * Global application custom scrollbar
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IScrollBarProps} props - component props
 * @returns {FC} - scrollbar functional component
 */
const ScrollBar: FC<IScrollBarProps> = (props) => {
  const { children, other } = props;

  return (
    <SimpleBarReact autoHide={false} {...other}>
      {children}
    </SimpleBarReact>
  );
};

export default ScrollBar;
