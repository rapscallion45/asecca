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

interface DataTableCellProps {
  value: string;
}

/* Data Table Cell helper component */
/* ================================ */
const DataTableCell: FC<DataTableCellProps> = (props) => {
  const { value } = props;

  return (
    <StyledTableCell align="left">
      {/* render passed value */}
      {value}
    </StyledTableCell>
  );
};

export default memo(DataTableCell);
