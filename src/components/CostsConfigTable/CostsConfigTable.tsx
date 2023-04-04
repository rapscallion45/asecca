import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DataTable from '@/components/DataTable/DataTable';
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
import { IDataTableColumn } from '@/components/DataTable/types';
import { IUserPermissionLevelState } from '@/redux/types';
import columns from './costsConfigTableColumns';

interface CostsConfigTableProps {
  permission: IUserPermissionLevelState;
  query: string;
}

/* Costs Config Data Table */
/* ======================= */
const CostsConfigTable: FC<CostsConfigTableProps> = (props) => {
  const { permission, query } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get costs config data held in redux state */
  const { data, loading, error, saving } = useSelector(
    (state: AppState) => state.costsConfig
  );

  /* filter the data table columns for current permission level */
  const [colFilterList, setColFilterList] = useState<Array<string>>(
    getCostsConfigColFilterList(permission.level)
  );

  /* keep track of whether table has been edited or not */
  const [isEdited, setIsEdited] = useState<boolean>(false);

  /* whenever the user permission global state is updated, re-filter cols */
  useEffect(() => {
    setColFilterList(getCostsConfigColFilterList(permission.level));
  }, [permission.level]);

  /* handle the saving of the table data */
  const handleSave = () => {
    dispatch(
      saveCostsConfigBySourceId({
        data: getCostsConfigPostData(permission.level, query, data?.costs),
      })
    );
  };

  /* handle the resetting of the table data */
  const handleCancel = () => {
    dispatch(resetCostsConfig());
    setIsEdited(false);
  };

  /* handle the update of the table data */
  const handleEditCellValue = (
    value: string | null,
    colKey: string,
    rowIdx: number
  ) => {
    dispatch(
      editCostsConfig({
        value: value !== '--' ? value : null,
        colKey: colKey as keyof ICostsConfigData,
        rowIdx,
      })
    );
    setIsEdited(true);
  };

  /* handle any required logic when determining a cell's display value */
  const handleGetCellValue = (rowIdx: number, column: IDataTableColumn) => {
    /* apply Prevailing column logic or simply return value */
    if (column.label === 'Prevailing')
      return getCostsConfigPrevailingCharge(data?.costs[rowIdx], permission);
    return data?.costs[rowIdx][column.key as keyof ICostsConfigData];
  };

  return (
    <>
      <DataTable
        name="costs config"
        /* filter table columns by current permission level */
        columns={columns.filter(
          (col: IDataTableColumn) => !colFilterList.includes(col.label)
        )}
        /* table editable cell(s) defined by user permission level */
        editableColLabels={[permission.level]}
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
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={handleSave}
          disabled={saving || loading || !isEdited}
          loading={saving}
        >
          Save
        </LoadingButton>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCancel}
          disabled={saving || loading || !isEdited}
          sx={{ backgroundColor: 'common.white', ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default CostsConfigTable;
