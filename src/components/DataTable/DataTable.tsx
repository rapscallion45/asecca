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
  CostsConfigRowCustom,
  CostsConfigRowTypical,
  DataTableColumn,
} from './types';

interface DataTableProps {
  name: string;
  editColName: string;
  columns: Array<DataTableColumn>;
  rows: Array<CostsConfigRowTypical | CostsConfigRowCustom>;
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
            <HeaderRow columns={columns} />
          </TableHead>
          <TableBody>
            <>
              {!isLoading && !isError && (
                <>
                  {/* map passed rows */}
                  {rows?.map(
                    (
                      row: CostsConfigRowTypical | CostsConfigRowCustom,
                      index: number
                    ) => (
                      <Fragment key={row.name}>
                        <DataRow
                          row={row}
                          rowIdx={index}
                          columns={columns}
                          /* we need the edit col to get 'Prevailing' value */
                          editCol={columns.find(
                            (col: DataTableColumn) => editColName === col.label
                          )}
                        />
                      </Fragment>
                    )
                  )}
                </>
              )}
              {!isLoading && isError && (
                <ErrorRow
                  columns={columns}
                  message="Error loading the requested data"
                />
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
