import { FC, ReactNode, memo } from 'react';
import { SxProps, Theme } from '@mui/material';
import StyledTableCell from '../StyledCellWrapper/StyledCellWrapper';

/**
 * Data Table Action Cell Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef IActionCellProps
 * @prop {ReactNode} getActionComponent - get component to present
 * @prop {SxProps<Theme> | undefined} sx - cell styling overrrides
 */
interface IActionCellProps {
  getActionComponent?: () => ReactNode;
  sx?: SxProps<Theme> | undefined;
}

/**
 * Data Table Action Cell
 *
 * Action table cell component for displaying action to user
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @param {IActionCellProps} props - component props
 * @returns {FC} - data table action cell functional component
 */
const ActionCell: FC<IActionCellProps> = (props) => {
  const { getActionComponent, sx } = props;

  return (
    <StyledTableCell align="left" sx={sx}>
      {getActionComponent && getActionComponent()}
    </StyledTableCell>
  );
};

export default memo(ActionCell);
