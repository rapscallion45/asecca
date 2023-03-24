import { FC, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import DataTableRow from './DataTableRow/DataTableRow';
import ClientOnly from '../ClientOnly/ClientOnly';

/* table head cell stylings */
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  /* table head colors */
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    fontWeight: 400,
  },
}));

interface DataTableProps {
  name: string;
  editColName: string;
  columns: any;
  rows: any;
  isLoading?: boolean;
  isError?: boolean;
}

/* Data Table */
/* ========== */
const DataTable: FC<DataTableProps> = (props) => {
  const {
    name,
    editColName,
    columns,
    rows,
    isLoading = false,
    isError = false,
  } = props;

  /* ClientOnly used to not allow tables to SSR */
  return (
    <ClientOnly>
      <TableContainer component={Paper}>
        <Table aria-label={`${name} table`}>
          <TableHead>
            <TableRow>
              {/* map passed columns to table headers row */}
              {columns.map((column: any) => (
                <StyledTableHeadCell key={column.key} align="center">
                  {column.label}
                </StyledTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {!isLoading && !isError && (
                <>
                  {/* map passed rows */}
                  {rows.map((row: any) => (
                    <Fragment key={row.name}>
                      <DataTableRow
                        row={row}
                        columns={columns}
                        /* we need the edit col to get 'Prevailing' value */
                        editCol={columns.find(
                          (col: any) => editColName === col.label
                        )}
                      />
                    </Fragment>
                  ))}
                </>
              )}
              {!isLoading && isError && (
                <Box
                  display="flex"
                  flexDirection="column"
                  py={7}
                  alignItems="center"
                >
                  <ErrorIcon color="error" fontSize="large" />
                  <Typography variant="h6" mt={2}>
                    Error loading the requested data
                  </Typography>
                </Box>
              )}
              {isLoading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  py={7}
                  alignItems="center"
                >
                  <CircularProgress />
                  <Typography variant="h6" mt={2}>
                    Loading...
                  </Typography>
                </Box>
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </ClientOnly>
  );
};

export default DataTable;
