import { FC, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { ICostsConfigData } from '@/lib/api/api-types';
import DataRow from './DataRow/DataRow';
import ClientOnly from '../ClientOnly/ClientOnly';
import ErrorRow from './ErrorRow/ErrorRow';
import LoadingRow from './LoadingRow/LoadingRow';
import HeaderRow from './HeaderRow/HeaderRow';
import { IDataTableColumn, IDataTableEditCellCallback } from './types';

interface IDataTableProps {
  name: string;
  editColName: string;
  columns: Array<IDataTableColumn>;
  rows: Array<ICostsConfigData>;
  isLoading?: boolean;
  error?: string;
  editCellCallback?: IDataTableEditCellCallback;
}

/* Data Table */
/* ========== */
const DataTable: FC<IDataTableProps> = (props) => {
  const {
    name,
    editColName,
    columns,
    rows,
    isLoading = false,
    error = '',
    editCellCallback,
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
                  {rows?.map((row: ICostsConfigData, index: number) => (
                    <Fragment key={row.name}>
                      <DataRow
                        row={row}
                        rowIdx={index}
                        columns={columns}
                        /* we need the edit col to get 'Prevailing' value */
                        editCol={columns.find(
                          (col: IDataTableColumn) => editColName === col.label
                        )}
                        editCellCallback={editCellCallback}
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
