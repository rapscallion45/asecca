import { styled } from '@mui/material/styles';
import { TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

/**
 * Styled Table Cell Wrapper
 *
 * Wrapper for application specific styling of a data table cell
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @returns {Component} - styled table data cell wrapper
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /* table head colors */
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  /* adjust font size */
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default StyledTableCell;
