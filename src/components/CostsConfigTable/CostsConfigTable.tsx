import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ICostsConfigData } from '@/lib/api/api-types';
import {
  getCostsConfigColFilterList,
  getCostsConfigPostData,
  getCostsConfigPrevailingCharge,
} from '@/utils';
import {
  saveBySourceId as saveCostsConfigBySourceId,
  resetCostsConfig,
  editCostsConfig,
} from '@/redux/slices/costsConfigSlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import { UserPermissionLevel } from '@/redux/types';
import columns from './costsConfigTableColumns';

/**
 * Costs Config Data Table Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigTableProps
 * @prop {UserPermissionLevel} permission - permission level of table
 * @prop {string} query - query string of fetch table data API call
 */
interface ICostsConfigTableProps {
  permission: UserPermissionLevel;
  query: string;
}

/**
 * Costs Config Data Table
 *
 * Presents the Costs Configuration table to the user, populated with data
 * fetched from API: /api/costs_config
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {ICostsConfigTableProps} props - component props
 * @returns {FC} - costs config table functional component
 */
const CostsConfigTable: FC<ICostsConfigTableProps> = (props) => {
  const { permission, query } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get costs config data held in redux state */
  const { data, loading, error, saving, edited } = useSelector(
    (state: AppState) => state.costsConfig
  );

  /**
   * Table column filter list
   *
   * Local state of filtered columns list for current permission level
   *
   * @since 0.0.0
   *
   * @constant
   */
  const [colFilterList, setColFilterList] = useState<Array<string | null>>(
    getCostsConfigColFilterList(permission)
  );

  /**
   * Whenever the user permission global state is updated, re-filter cols
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   */
  useEffect(() => {
    setColFilterList(getCostsConfigColFilterList(permission));
  }, [permission]);

  /**
   * Handles the saving of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveCostsConfigBySourceId({
        data: getCostsConfigPostData(permission, query, data?.costs),
      })
    );
  }, [permission, query, data?.costs, dispatch]);

  /**
   * Handles the resetting of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   */
  const handleCancel = useCallback(() => {
    dispatch(resetCostsConfig());
  }, [dispatch]);

  /**
   * Handles the update of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   * @param {string | null} value - value to be used in update
   * @param {string} colKey - column key to be updated
   * @param {number} rowIdx - table row index to be updated
   */
  const handleEditCellValue = useCallback(
    (value: DataTableRowCellValue, colKey: string, rowIdx: number) => {
      dispatch(
        editCostsConfig({
          value: value !== '--' ? value : (null as DataTableRowCellValue),
          colKey: colKey as keyof ICostsConfigData,
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
   * @since 0.0.0
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue => {
      /* apply Prevailing column logic or simply return value */
      if (column.label === 'Prevailing')
        return getCostsConfigPrevailingCharge(data?.costs[rowIdx], permission);
      return data?.costs[rowIdx][column.key as keyof ICostsConfigData];
    },
    [data?.costs, permission]
  );

  return (
    <>
      <DataTable
        name="costs config"
        /* filter table columns by current permission level */
        columns={columns.filter(
          (col: IDataTableColumn) => !colFilterList.includes(col.label)
        )}
        /* table editable cell(s) defined by user permission level */
        editableColLabels={[permission]}
        /* build table row props from costs config data */
        rows={data?.costs.map((cost: ICostsConfigData) => ({
          label: cost.name,
        }))}
        isLoading={loading}
        error={error}
        editCellValueCallback={handleEditCellValue}
        getCellValueCallback={handleGetCellValue}
      />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCancel}
          disabled={saving || loading || !edited}
          sx={{ backgroundColor: 'common.white' }}
        >
          Cancel
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
    </>
  );
};

export default CostsConfigTable;
