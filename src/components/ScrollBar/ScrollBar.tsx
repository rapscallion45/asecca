import { FC, ReactNode } from 'react';
import SimpleBarReact from 'simplebar-react';
import { alpha, styled } from '@mui/material/styles';

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
 * Scrollbar Style
 *
 * Global application scrollbar styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled scrollbar component
 */
const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

/**
 * Scrollbar Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IScrollBarProps
 * @prop {ReactNode} children - component children nodes
 * @prop {any} sx - component styling options
 * @prop {any} other - component props to passed through to children
 */
interface IScrollBarProps {
  children: ReactNode;
  sx?: any;
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
  const { children, sx, other } = props;

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};

export default ScrollBar;
