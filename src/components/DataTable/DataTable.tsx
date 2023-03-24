import { FC, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import DataTableRow from './DataTableRow/DataTableRow';
import ClientOnly from '../ClientOnly/ClientOnly';
import DataTableErrorRow from './DataTableErrorRow/DataTableErrorRow';
import DataTableLoadingRow from './DataTableLoadingRow/DataTableLoadingRow';
import DataTableHeader from './DataTableHeader/DataTableHeader';
import { DataTableColumn } from '../types';

interface DataTableProps {
  name: string;
  editColName: string;
  columns: Array<DataTableColumn>;
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
            <DataTableHeader columns={columns} />
          </TableHead>
          <TableBody>
            <>
              {!isLoading && !isError && (
                <>
                  {/* map passed rows */}
                  {rows?.map((row: any) => (
                    <Fragment key={row.name}>
                      <DataTableRow
                        row={row}
                        columns={columns}
                        /* we need the edit col to get 'Prevailing' value */
                        editCol={columns.find(
                          (col: DataTableColumn) => editColName === col.label
                        )}
                      />
                    </Fragment>
                  ))}
                </>
              )}
              {!isLoading && isError && (
                <DataTableErrorRow
                  columns={columns}
                  message="Error loading the requested data"
                />
              )}
              {isLoading && (
                <DataTableLoadingRow columns={columns} message="Loading..." />
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </ClientOnly>
  );
};

export default DataTable;
