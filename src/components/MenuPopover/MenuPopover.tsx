import { FC, ReactNode } from 'react';
import { Popover } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

/**
 * Arrow Style
 *
 * Custom menu popover anchor arrow styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @component
 * @returns {Component} - styled anchor arrow component
 */
const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

/**
 * Menu Popover Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IMenuPopoverProps
 * @prop {boolean} open - popover open flag
 * @prop {ReactNode} children - child nodes
 * @prop {any} sx - custom styling options
 * @prop {any} other - passed props
 * @prop {any} onClose - popover close callback
 * @prop {any} anchorE1 - popover anchor element
 * @prop {any} x - all other props
 */
interface IMenuPopoverProps {
  open: boolean;
  children?: ReactNode;
  sx?: any;
  other?: any;
  onClose?: () => void;
  anchorEl: any;
  // all other props
  [x: string]: any;
}

/**
 * Menu Popover
 *
 * Global application menu popover component
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IMenuPopoverProps} props - component props
 * @returns {FC} - menu popover component
 */
const MenuPopover: FC<IMenuPopoverProps> = (props) => {
  const { open, children = null, sx = null, ...other } = props;

  return (
    <Popover
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          pt: 1,
          ml: 0.5,
          overflow: 'inherit',
          border: 'none',
          width: 200,
          ...sx,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />
      {children}
    </Popover>
  );
};

export default MenuPopover;
