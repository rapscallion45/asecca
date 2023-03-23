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

const columns: Array<any> = [
  { label: 'Product', key: 'name' },
  { label: 'Global', key: 'global_charge' },
  { label: 'Customer', key: 'customer_charge' },
  { label: 'Project', key: 'project_charge' },
  { label: 'Collection', key: 'collection_charge' },
  { label: 'Prevailing', key: 'effective_charge' },
];

const createData: any = (
  name: string,
  global_charge: number,
  customer_charge: number,
  project_charge: number,
  collection_charge: number,
  effective_charge: number
) => ({
  name,
  global_charge,
  customer_charge,
  project_charge,
  collection_charge,
  effective_charge,
});

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 3.9),
];

interface DataTableProps {
  name: string;
}

/* Data Table */
/* ========== */
const DataTable: FC<DataTableProps> = (props) => {
  const { name } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label={`${name} table`}>
        <TableHead>
          <TableRow>
            {columns.map((column: any) => (
              <StyledTableCell key={column.key} align="center">
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <StyledTableRow key={row.name}>
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
