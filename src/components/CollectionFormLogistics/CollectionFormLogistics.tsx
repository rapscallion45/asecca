import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { AppState, AppDispatch } from '@/redux/store';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICollectionFormLogisticsData } from '@/lib/api/api-types';
import {
  getCollectionFormLogisticsCellValue,
  getCollectionFormLogisticsEditCellValue,
  getCollectionFormLogisticsTableColsList,
} from '@/utils';
import {
  saveByCollectionId as saveLogisticsByCollectionId,
  resetLogistics,
  editLogistics,
  addLogistics,
  deleteLogistics,
} from '@/redux/slices/collectionFormLogisticsSlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import columns from './collectionFormLogisticsTableColumns';

/**
 * Collection Form Logistics Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsProps
 * @prop {string} collectionId - ID string of Collection for table data API call
 */
interface ICollectionFormLogisticsProps {
  collectionId: string;
}

/**
 * Collection Form Logistics
 *
 * Presents the Collection Form Logisitcs table to the user, populated with data
 * fetched from API: /api/collection/logistics/api/logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @param {ICollectionFormLogisticProps} props - component props
 * @returns {FC} - collection form logistics table functional component
 */
const CollectionFormLogistics: FC<ICollectionFormLogisticsProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form logisitcs data held in redux state */
  const {
    data,
    loading,
    error,
    saving,
    edited,
    types: logisticsTypes,
  } = useSelector((state: AppState) => state.collectionFormLogistics);

  /**
   * Table column list
   *
   * Local state of columns list for available logistics and facilities
   *
   * @since 0.0.13
   *
   * @constant
   */
  const [colList, setColList] = useState<Array<IDataTableColumn>>([]);

  /* Whenever Logisitcs data updates, update column list */
  useEffect(() => {
    setColList(
      getCollectionFormLogisticsTableColsList(columns, data, logisticsTypes)
    );
  }, [data, logisticsTypes]);

  /**
   * Handles the saving of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveLogisticsByCollectionId({
        data: {
          collection: collectionId,
          rows: data?.rows,
        },
      })
    );
  }, [collectionId, data?.rows, dispatch]);

  /**
   * Handles the resetting of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   */
  const handleReset = useCallback(() => {
    dispatch(resetLogistics());
  }, [dispatch]);

  /**
   * Handles the update of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {DataTableRowCellValue} value - value to be used in update
   * @param {string} colKey - column key to be updated
   * @param {number} rowIdx - table row index to be updated
   */
  const handleEditCellValue = useCallback(
    (value: DataTableRowCellValue, colKey: string, rowIdx: number) => {
      dispatch(
        editLogistics(
          getCollectionFormLogisticsEditCellValue(
            data,
            value,
            colKey,
            rowIdx,
            logisticsTypes.logistics_types,
            colList
          )
        )
      );
    },
    [data, colList, logisticsTypes, dispatch]
  );

  /**
   * Handles any required logic when determining a cell's display value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue =>
      getCollectionFormLogisticsCellValue(
        data?.rows[rowIdx],
        column,
        logisticsTypes.logistics_types
      ),
    [data?.rows, logisticsTypes.logistics_types]
  );

  /**
   * Determines whether specific table cell can be edited
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {string} colKey - column key to be updated
   * @param {number} rowIdx - table row index to be updated
   * @returns {boolean} - whether cell is editable
   */
  const canEditCellValue = useCallback(
    (colKey: string, rowIdx: number): boolean => {
      /* logistics type can always be changed */
      if (colKey === 'logistics_type') return true;
      return (
        logisticsTypes.logistics_types
          .find(
            (type) => type.logistics_type === data.rows[rowIdx].logistics_type
          )
          ?.compatible_facilities.some(
            (facility) => lodash.snakeCase(facility) === colKey
          ) || false
      );
    },
    [data, logisticsTypes.logistics_types]
  );

  /**
   * Handles addition of table row for new Logistics type
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   */
  const handleAddRow = useCallback(() => dispatch(addLogistics()), [dispatch]);

  /**
   * Handles deletion of table row for passed row index
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {number} rowIdx - table row index to be deleted
   */
  const handleDeleteRow = useCallback(
    (rowIdx: number) => dispatch(deleteLogistics({ rowIdx })),
    [dispatch]
  );

  /**
   * Handles requests for the action component for specific column
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {string} colKey - table column key of the action cell
   * @param {number} rowIdx - table row index of the action cell
   * @returns {ReactNode} - action component to present
   */
  const getActionComponent = (colKey: string, rowIdx: number) => (
    <IconButton aria-label="delete" onClick={() => handleDeleteRow(rowIdx)}>
      <DeleteIcon />
    </IconButton>
  );

  return (
    <Card>
      <CardHeader title="Logistics" />
      <CardContent sx={{ pt: 0 }}>
        <DataTable
          name="collection form logistics"
          /* filter table columns by current logistics type */
          columns={colList}
          /* can edit all cells in logistics table */
          editableColLabels={colList.map((col) => col.label)}
          /* build table row props from logistics data */
          rows={data?.rows.map((logistic: ICollectionFormLogisticsData) => ({
            label: logistic.logistics_type,
          }))}
          isLoading={loading}
          error={error}
          editCellValueCallback={handleEditCellValue}
          getCellValueCallback={handleGetCellValue}
          canEditCellValueCallback={canEditCellValue}
          getActionComponent={getActionComponent}
        />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={handleAddRow}
            disabled={saving || loading}
          >
            Add +
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleReset}
            disabled={saving || loading || !edited}
            sx={{ backgroundColor: 'common.white' }}
          >
            Reset
          </Button>
          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleSave}
            disabled={saving || loading || !edited}
            loading={saving}
            sx={{ ml: 2 }}
          >
            Save
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionFormLogistics;
