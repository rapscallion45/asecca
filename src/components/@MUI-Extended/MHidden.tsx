import { FC, ReactNode } from 'react';
import { useMediaQuery, Theme, Breakpoint } from '@mui/material';

/**
 * MHidden Width types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 *
 * @typedef MHiddenWidthTypes
 */
export type MHiddenWidthTypes =
  | 'xsDown'
  | 'smDown'
  | 'mdDown'
  | 'lgDown'
  | 'xlDown'
  | 'xsUp'
  | 'smUp'
  | 'mdUp'
  | 'lgUp'
  | 'xlUp';

/**
 * MHidden Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IMHiddenProps
 * @prop {ReactNode} children - component children nodes
 * @prop {MHiddenWidthTypes} width - width threshold for hiding children
 */
interface IMHiddenProps {
  width: MHiddenWidthTypes;
  children: ReactNode;
}

/**
 * MHidden
 *
 * Global application component for displaying children components only
 * on certain screen sizes
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IMHiddenProps} props - component props
 * @returns {FC} - MHidden component
 */
const MHidden: FC<IMHiddenProps> = (props) => {
  const { width, children } = props;

  const breakpoint = width.substring(0, 2) as Breakpoint;

  const hiddenUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes('Down')) {
    return hiddenDown ? null : <div>{children}</div>;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : <div>{children}</div>;
  }

  return null;
};

export default MHidden;
