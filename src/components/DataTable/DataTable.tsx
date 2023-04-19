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

/**
 * Data Table Props
 *
 * @since - 0.0.0
 *
 * @typedef IDataTableProps
 * @prop {string} name - data table name identifier
 * @prop {Array<IDataTableColumn>} columns - data tables columns to be presented
 * @prop {Array<string>} editableColLabels - columns labels that will be editable
 * @prop {Array<IDataTableRow>} rows - data table rows to be presented
 * @prop {boolean} isLoading - data table loading data flag
 * @prop {string} error - data table error message string
 * @prop {IDataTableEditCellValueCallback} editCellValueCallback - edit cell value callback, called when cell updated
 * @prop {IDataTableGetCellValueCallback} getCellValueCallback - get cell value callback, called when rendering cell
 */
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

/**
 * Data Table
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param {IDataTableProps} props - component props
 * @returns {FC} - data table functional component
 */
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
              {/* check loading and error states, and if we have data */}
              {!isLoading && !error && rows.length > 0 && (
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
              {/* passed error state */}
              {!isLoading && Boolean(error) && (
                <ErrorRow columns={columns} message={error} />
              )}
              {/* no data rows passed to table */}
              {!isLoading && Boolean(!error) && rows.length <= 0 && (
                <ErrorRow columns={columns} message="No data loaded." />
              )}
              {/* loading state */}
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
