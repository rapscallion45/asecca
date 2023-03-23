import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/* table cell stylings */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/* table row stylings */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  /* hide last border */
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface DataTableProps {
  name: string;
  columns: any;
  rows: any;
}

/* Data Table */
/* ========== */
const DataTable: FC<DataTableProps> = (props) => {
  const { name, columns, rows } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label={`${name} table`}>
        <TableHead>
          <TableRow>
            {/* map passed columns */}
            {columns.map((column: any) => (
              <StyledTableCell key={column.key} align="center">
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* map passed rows */}
          {rows.map((row: any) => (
            <StyledTableRow key={row.name}>
              {/* map passed column data for current row */}
              {columns.map((column: any) => (
                <StyledTableCell
                  key={`${row.name}-${column.key}`}
                  align="center"
                >
                  {row[column.key]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
