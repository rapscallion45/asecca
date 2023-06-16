import { FC, ReactNode } from 'react';
import SimpleBarReact from 'simplebar-react';
import { styled } from '@mui/material/styles';

/**
 * Scrollbar Root Style
 *
 * Global application scrollbar root wrapper styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled scrollbar wrapper component
 */
const RootStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
});

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
    <RootStyle>
      <SimpleBarReact autoHide={false} {...other}>
        {children}
      </SimpleBarReact>
    </RootStyle>
  );
};

export default ScrollBar;
