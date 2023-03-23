import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  /* hide last border */
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  product: string,
  global: number,
  customer: number,
  project: number,
  collection: number,
  prevailing: number
) {
  return { product, global, customer, project, collection, prevailing };
}

const columns: Array<string> = [
  'Product',
  'Global',
  'Customer',
  'Project',
  'Collection',
  'Prevailing',
];

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 3.9),
];

const DataTable: FC = () => (
  <TableContainer component={Paper}>
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell key={column} align="center">
              {column}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.product}>
            <StyledTableCell component="th" scope="row" align="center">
              {row.product}
            </StyledTableCell>
            <StyledTableCell align="center">{row.global}</StyledTableCell>
            <StyledTableCell align="center">{row.customer}</StyledTableCell>
            <StyledTableCell align="center">{row.project}</StyledTableCell>
            <StyledTableCell align="center">{row.collection}</StyledTableCell>
            <StyledTableCell align="center">{row.prevailing}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;
