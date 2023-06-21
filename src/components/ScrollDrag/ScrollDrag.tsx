import { FC, useRef, ReactNode, MutableRefObject } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import SimpleBarReact from 'simplebar-react';

/**
 * Scroll Drag Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IScrollDragProps
 * @prop {ReactNode} children - component children nodes
 * @prop {any} other - component props to passed through to children
 */
interface IScrollDragProps {
  children: ReactNode;
  other?: any;
}

/**
 * Scroll Drag
 *
 * Global application custom horizontal scroll by mouse drag
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @component
 * @param {IScrollDragProps} props - component props
 * @returns {FC} - scroll drag functional component
 */
const ScrollDrag: FC<IScrollDragProps> = (props) => {
  const { children, other } = props;
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <SimpleBarReact
      scrollableNodeProps={{ ref }}
      {...events}
      autoHide={false}
      {...other}
    >
      {children}
    </SimpleBarReact>
  );
};

export default ScrollDrag;
