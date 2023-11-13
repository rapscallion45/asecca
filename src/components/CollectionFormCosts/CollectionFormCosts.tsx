import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import { Card, CardHeader, CardContent, Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ICollectionFormCostsData } from '@/lib/api/api-types';
import {
  getCostsConfigColFilterList,
  getCollectionFormCostsPostData,
  getCollectionFormCostsPrevailingCharge,
} from '@/utils';
import {
  saveByCollectionId as saveCostsByCollectionId,
  resetCosts,
  editCosts,
  fetchByCollectionId,
} from '@/redux/slices/collectionFormCostsSlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import { UserPermissionLevel } from '@/redux/types';
import columns from './collectionFormCostsTableColumns';

/**
 * Collection Form Costs Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsProps
 * @prop {string} collectionId - ID string of Collection for table data API call
 */
interface ICollectionFormCostsProps {
  collectionId: string;
}

/**
 * Collection Form Costs
 *
 * Presents the Collection Form Costs table to the user, populated with data
 * fetched from API: /api/collection/costs/api/costs
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @param {ICollectionFormCostsProps} props - component props
 * @returns {FC} - collection form costs table functional component
 */
const CollectionFormCosts: FC<ICollectionFormCostsProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form costs data held in redux state */
  const { data, loading, error, saving, edited } = useSelector(
    (state: AppState) => state.collectionFormCosts
  );

  /* on change of Collection ID, fetch data from API */
  useEffect(() => {
    dispatch(fetchByCollectionId({ collectionId }));
  }, [collectionId]);

  /**
   * Table column filter list
   *
   * Local state of filtered columns list for Collection permission level
   *
   * @since 0.0.13
   *
   * @constant
   */
  const [colFilterList] = useState<Array<string | null>>(
    getCostsConfigColFilterList('Collection' as UserPermissionLevel)
  );

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
      saveCostsByCollectionId({
        data: getCollectionFormCostsPostData(collectionId, data?.rows),
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
    dispatch(resetCosts());
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
        editCosts({
          value: value !== '--' ? value : null,
          colKey: colKey as keyof ICollectionFormCostsData,
          rowIdx,
        })
      );
    },
    [dispatch]
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
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue => {
      /* apply Prevailing column logic or simply return value */
      if (column.key === 'effective_charge')
        return getCollectionFormCostsPrevailingCharge(data?.rows[rowIdx]);
      return data?.rows[rowIdx][column.key as keyof ICollectionFormCostsData];
    },
    [data?.rows]
  );

  return (
    <Card>
      <CardHeader title="Costs" />
      <CardContent sx={{ pt: 0 }}>
        <DataTable
          name="collection form costs"
          /* filter table columns by current permission level */
          columns={columns.filter(
            (col: IDataTableColumn) => !colFilterList.includes(col.label)
          )}
          /* table editable cell(s) is the collection charge column */
          editableColLabels={['Collection Charge']}
          /* build table row props from costs data */
          rows={data?.rows.map((cost: ICollectionFormCostsData) => ({
            label: cost.chargeable,
          }))}
          isLoading={loading}
          error={error}
          editCellValueCallback={handleEditCellValue}
          getCellValueCallback={handleGetCellValue}
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
            Commit
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionFormCosts;
