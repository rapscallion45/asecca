import { FC, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import DataRow from './DataRow/DataRow';
import ClientOnly from '../ClientOnly/ClientOnly';
import ErrorRow from './ErrorRow/ErrorRow';
import LoadingRow from './LoadingRow/LoadingRow';
import HeaderRow from './HeaderRow/HeaderRow';
import {
  IDataTableColumn,
  IDataTableRow,
  IDataTableEditCellValueCallback,
  IDataTableGetCellValueCallback,
} from './types';

interface IDataTableProps {
  name: string;
  columns: Array<IDataTableColumn>;
  editableColLabels: Array<string>;
  rows: Array<IDataTableRow>;
  isLoading?: boolean;
  error?: string;
  editCellValueCallback?: IDataTableEditCellValueCallback;
  getCellValueCallback: IDataTableGetCellValueCallback;
}

/* Data Table */
/* ========== */
const DataTable: FC<IDataTableProps> = (props) => {
  const {
    name,
    columns,
    editableColLabels,
    rows,
    isLoading = false,
    error = '',
    editCellValueCallback,
    getCellValueCallback,
  } = props;

  /* ClientOnly used to not allow tables to SSR */
  return (
    <ClientOnly>
      <TableContainer component={Paper}>
        <Table aria-label={`${name} table`}>
          <TableHead>
            <HeaderRow columns={columns} />
          </TableHead>
          <TableBody>
            <>
              {!isLoading && !error && (
                <>
                  {/* map passed rows */}
                  {rows?.map((row: IDataTableRow, index: number) => (
                    <Fragment key={row.label}>
                      <DataRow
                        rowName={row.label}
                        rowIdx={index}
                        columns={columns}
                        editableColLabels={editableColLabels}
                        editCellValueCallback={editCellValueCallback}
                        getCellValueCallback={getCellValueCallback}
                      />
                    </Fragment>
                  ))}
                </>
              )}
              {!isLoading && Boolean(error) && (
                <ErrorRow columns={columns} message={error} />
              )}
              {isLoading && (
                <LoadingRow columns={columns} message="Loading..." />
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </ClientOnly>
  );
};

export default DataTable;
