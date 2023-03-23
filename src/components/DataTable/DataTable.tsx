import { FC, useState, Fragment, ChangeEvent } from 'react';
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
import { Input, InputAdornment, FormControl } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import ClientOnly from '../ClientOnly/ClientOnly';

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

/* table row stylings */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  /* alternate row background colors */
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  /* hide last border */
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface NonEditableCellProps {
  column: any;
  row: any;
  editValue: string;
}

/* Non Editable Table Cell helper component */
/* ======================================== */
const NonEditableCell: FC<NonEditableCellProps> = (props) => {
  const { row, column, editValue } = props;

  return (
    <StyledTableCell align="center">
      {/* all values are currency apart from name */}
      {column.key !== 'name' && column.label !== 'Prevailing' ? (
        <div>
          {row[column.key] != null
            ? `£${parseInt(row[column.key], 10).toFixed(2)}`
            : '--'}
        </div>
      ) : (
        <>
          {/* the 'Prevailing' column is always equal to the
          editable col (permission level) */}
          {column.label === 'Prevailing'
            ? `£${parseInt(editValue, 10).toFixed(2)}` || '--'
            : row[column.key]}
        </>
      )}
    </StyledTableCell>
  );
};

interface EditableCellProps {
  column: any;
  row: any;
  editValue: string;
  handleEditValueChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

/* Editable Table Cell helper component */
/* ==================================== */
const EditableCell: FC<EditableCellProps> = (props) => {
  const { row, column, editValue, handleEditValueChange } = props;

  return (
    <StyledTableCell sx={{ textAlign: 'center', p: 0 }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Input
          id={`${row.name}-${column.key}-input`}
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          onChange={handleEditValueChange}
          value={editValue}
          required
        />
      </FormControl>
    </StyledTableCell>
  );
};

interface DataTableRowProps {
  columns: any;
  row: any;
  editCol: any;
}

/* Data Table Row helper component */
/* =============================== */
const DataTableRow: FC<DataTableRowProps> = (props) => {
  const { row, columns, editCol } = props;
  const [editValue, setEditValue] = useState<string>(
    parseInt(row[editCol?.key], 10).toFixed(2)
  );

  const handleValueChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: any) => (
        <Fragment key={`${row.name}-${column.key}`}>
          {/* render a normal cell if not editable */}
          {column.label !== editCol.label && (
            <NonEditableCell
              row={row}
              column={column}
              /* we need the edit value for 'Prevailing' */
              editValue={editValue}
            />
          )}
          {/* if this is col is editable, render input cell */}
          {column.label === editCol.label && (
            <EditableCell
              row={row}
              column={column}
              editValue={editValue}
              handleEditValueChange={handleValueChange}
            />
          )}
        </Fragment>
      ))}
    </StyledTableRow>
  );
};

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
                <StyledTableCell key={column.key} align="center">
                  {column.label}
                </StyledTableCell>
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
