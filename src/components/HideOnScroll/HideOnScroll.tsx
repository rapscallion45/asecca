import { FC, ReactElement } from 'react';
import { useScrollTrigger, Slide } from '@mui/material';

/**
 * Hide On Scroll Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IHideOnScrollProps
 * @prop {ReactElement<any, any>} children - child node(s)

 */
interface IHideOnScrollProps {
  children: ReactElement<any, any>;
}

/**
 * Hide On Scroll
 *
 * Helper component for bringing children components in and out of view
 * depending on user scroll position
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IHideOnScrollProps} props - component props
 * @returns {FC} - hide on scroll functional component
 */
const HideOnScroll: FC<IHideOnScrollProps> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
