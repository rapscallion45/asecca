import {
  FC,
  useRef,
  ReactNode,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
import useDraggable from '@/hooks/useDraggable';
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
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ref =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement | null>;
  const { events } = useDraggable(ref as MutableRefObject<HTMLInputElement>, {
    isMounted,
  });

  /* on first load, set isMounted flag */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SimpleBarReact
      scrollableNodeProps={{ ref: isMounted ? ref : null }}
      {...events}
      autoHide={false}
      {...other}
    >
      {children}
    </SimpleBarReact>
  );
};

export default ScrollDrag;
