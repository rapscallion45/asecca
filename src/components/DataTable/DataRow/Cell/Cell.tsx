import { FC, memo } from 'react';
import { SxProps, Theme } from '@mui/material';
import StyledTableCell from '../StyledCellWrapper/StyledCellWrapper';

/**
 * Data Table Cell Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICellProps
 * @prop {string | Null} value - cell value, can be null
 * @prop {SxProps<Theme> | undefined} sx - cell styling overrrides
 */
interface ICellProps {
  value: string | null;
  sx?: SxProps<Theme> | undefined;
}

/**
 * Data Table Cell
 *
 * Generic table cell component for displaying a table value as a string
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {ICellProps} props - component props
 * @returns {FC} - data table cell functional component
 */
const Cell: FC<ICellProps> = (props) => {
  const { value, sx } = props;

  return (
    <StyledTableCell align="left" sx={sx}>
      {value}
    </StyledTableCell>
  );
};

export default memo(Cell);
