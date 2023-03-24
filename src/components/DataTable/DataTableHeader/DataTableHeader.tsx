import { FC } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DataTableColumn } from '@/components/types';

/* table header cell stylings */
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  /* table header colors */
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    fontWeight: 400,
  },
}));

interface DataTableHeaderProps {
  columns: Array<DataTableColumn>;
}

/* Data Table Header helper */
/* ======================== */
const DataTableHeader: FC<DataTableHeaderProps> = (props) => {
  const { columns } = props;

  return (
    <TableRow>
      {/* map passed columns to table headers row */}
      {columns.map((column: DataTableColumn) => (
        <StyledTableHeadCell key={column.key} align="left">
          {column.label}
        </StyledTableHeadCell>
      ))}
    </TableRow>
  );
};

export default DataTableHeader;
