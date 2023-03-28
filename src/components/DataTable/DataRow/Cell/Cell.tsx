import { FC, memo } from 'react';
import { styled } from '@mui/material/styles';
import { TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

/* table cell stylings */
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

interface ICellProps {
  value: string;
  sx: any;
}

/* Data Table Cell helper component */
/* ================================ */
const Cell: FC<ICellProps> = (props) => {
  const { value, sx } = props;

  return (
    <StyledTableCell align="left" sx={sx}>
      {/* render passed value */}
      {value}
    </StyledTableCell>
  );
};

export default memo(Cell);
