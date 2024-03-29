import { FC, useEffect, useCallback, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  ICollectionFormFacilityData,
  ICollectionFormFacilityAssetCategoryFacilitiesDataPayload,
  ICollectionFormFacilityWorkflowsDataPayload,
} from '@/lib/api/api-types';
import {
  saveByCollectionId as saveFacilityByCollectionId,
  resetFacility,
  editFacility,
  fetchWorkflows,
  fetchAssetCategoryFacilities,
} from '@/redux/slices/collectionFormFacilitySlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import columns from './collectionFormFacilityTableColumns';
import LoadingPanel from '../LoadingPanel/LoadingPanel';

/**
 * Collection Form Facility Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityProps
 * @prop {string} collectionId - ID string of Collection for table data API call
 */
interface ICollectionFormFacilityProps {
  collectionId: string;
}

/**
 * Collection Form Facility
 *
 * Presents the Collection Form Facility table to the user, populated with data
 * fetched from API: /api/collection/facility/api/facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @component
 * @param {ICollectionFormFacilityProps} props - component props
 * @returns {FC} - collection form facility table functional component
 */
const CollectionFormFacility: FC<ICollectionFormFacilityProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form facility data held in redux state */
  const {
    data,
    dataShadow,
    loading,
    error,
    saving,
    edited,
    loadingAssetCategoryFacilities,
    assetCategoryFacilities,
    loadingWorkflows,
    workflows,
  } = useSelector((state: AppState) => state.collectionFormFacility);

  /**
   * On first load, build facility and initial workflow options for each row
   *
   * Use data shadow, as this never changes as user manipulates the table. On
   * new fetch of the entire table data, shadow copy will be updated,
   * will cause re-trigger of effect
   */
  useEffect(() => {
    dataShadow.rows.forEach(
      (row: ICollectionFormFacilityData, index: number) => {
        dispatch(
          fetchAssetCategoryFacilities({
            assetCategory: row.asset_category,
            rowIdx: index,
          })
        );
        if (row.facility)
          dispatch(
            fetchWorkflows({
              assetCategory: row.asset_category,
              facility: row.facility,
              rowIdx: index,
            })
          );
      }
    );
  }, [dataShadow.rows, dispatch]);

  /**
   * Handles the saving of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveFacilityByCollectionId({
        data: {
          collection: collectionId,
          rows: data?.rows,
        },
      })
    );
  }, [collectionId, data, dispatch]);

  /**
   * Handles the resetting of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   */
  const handleReset = useCallback(() => {
    dispatch(resetFacility());
  }, [dispatch]);

  /**
   * Handles the update of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {DataTableRowCellValue} value - value to be used in update
   * @param {string} colKey - column key to be updated
   * @param {number} rowIdx - table row index to be updated
   */
  const handleEditCellValue = useCallback(
    (value: DataTableRowCellValue, colKey: string, rowIdx: number): void => {
      dispatch(editFacility({ value, colKey, rowIdx }));
    },
    [dispatch]
  );

  /**
   * Handles any required logic when determining a cell's display value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue =>
      data.rows[rowIdx][column.key as keyof ICollectionFormFacilityData],
    [data]
  );

  /**
   * Handles requests to view selected workflow
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {number} rowIdx - table row index of the action cell
   */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handleViewWorkflow = useCallback((rowIdx: number) => {}, []);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  /**
   * Handles any required logic when a facility select dropdown is changed
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {SelectChangeEvent} event - facility select dropdown change event
   * @param {IDataTableColumn} column - column to update value for
   * @param {number} rowIdx - table row index to update value for
   */
  const handleFacilityChange = useCallback(
    (event: SelectChangeEvent, colKey: string, rowIdx: number) => {
      /* update the global state */
      handleEditCellValue(event.target.value, colKey, rowIdx);

      /* if we have null value, clear workflow and do not dispatch fetch */
      if (event.target.value === '') {
        /* update the global state */
        handleEditCellValue('', 'workflow', rowIdx);
        return;
      }

      /* fetch new workflow options for this facility and asset category combo */
      dispatch(
        fetchWorkflows({
          assetCategory: data.rows[rowIdx].asset_category,
          facility: event.target.value,
          rowIdx,
        })
      );
    },
    [data.rows, handleEditCellValue, dispatch]
  );

  /**
   * Handles any required logic when a workflow select dropdown is changed
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {SelectChangeEvent} event - workflow select dropdown change event
   * @param {IDataTableColumn} column - column to update value for
   * @param {number} rowIdx - table row index to update value for
   */
  const handleWorkflowChange = useCallback(
    (event: SelectChangeEvent, colKey: string, rowIdx: number) => {
      /* update the global state */
      handleEditCellValue(event.target.value, colKey, rowIdx);
    },
    [handleEditCellValue]
  );

  /**
   * Helper function for rendering form table select fields
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {string} colKey - table column key of the action cell
   * @param {number} rowIdx - table row index of the action cell
   * @param {string} value - current selected value
   * @param {Array<ICollectionFormFacilityAssetCategoryFacilitiesDataPayload | ICollectionFormFacilityWorkflowsDataPayload>} options - select options present
   * @param {function} handleChange - handle select change callback
   * @returns {ReactNode} - select dropdown component
   */
  const getSelectDropdown = useCallback(
    (
      colKey: string,
      rowIdx: number,
      value: string,
      options:
        | ICollectionFormFacilityAssetCategoryFacilitiesDataPayload
        | ICollectionFormFacilityWorkflowsDataPayload,
      handleChange: (
        event: SelectChangeEvent,
        colKey: string,
        rowIdx: number
      ) => void
    ): ReactNode => (
      <FormControl variant="standard" sx={{ minWidth: 200 }}>
        <Select
          id={`${colKey}-select-input`}
          value={value}
          renderValue={(selectValue: string | null) =>
            /* if current value is null, display the unassigned text */
            selectValue === null || selectValue === '' ? (
              <MenuItem value="">
                {
                  columns.find((col: IDataTableColumn) => col.key === colKey)
                    ?.unassignedText
                }
              </MenuItem>
            ) : (
              /* we have a value, display it */
              <MenuItem value={selectValue}>{selectValue}</MenuItem>
            )
          }
          onChange={(event: SelectChangeEvent) =>
            handleChange(event, colKey, rowIdx)
          }
          displayEmpty={
            columns.find((col: IDataTableColumn) => col.key === colKey)
              ?.allowUnassigned
          }
          color="secondary"
        >
          {/* check if this dropdown can be unassigned a value */}
          {columns.find((col: IDataTableColumn) => col.key === colKey)
            ?.allowUnassigned && <MenuItem value="">Unassigned</MenuItem>}
          {/* map passed select options */}
          {options?.map((option: any) => (
            <MenuItem
              key={`${data.rows[rowIdx].asset_category}-${option}-option`}
              value={
                typeof option === 'object' && 'name' in option
                  ? option.name
                  : option
              }
            >
              {typeof option === 'object' && 'name' in option
                ? option.name
                : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    [data.rows]
  );

  /**
   * Handles requests for the action component for specific column
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {string} colKey - table column key of the action cell
   * @param {number} rowIdx - table row index of the action cell
   * @returns {ReactNode} - action component to present
   */
  const getActionComponent = useCallback(
    (colKey: string, rowIdx: number): ReactNode => {
      switch (colKey) {
        case 'facility':
          return getSelectDropdown(
            colKey,
            rowIdx,
            data.rows[rowIdx].facility || '',
            assetCategoryFacilities[rowIdx],
            handleFacilityChange
          );
        case 'workflow':
          return data.rows[rowIdx].facility ? (
            getSelectDropdown(
              colKey,
              rowIdx,
              data.rows[rowIdx].workflow || '',
              workflows[rowIdx],
              handleWorkflowChange
            )
          ) : (
            <Typography ml={2}>Please select a facility</Typography>
          );
        case 'view_workflow':
          return data.rows[rowIdx].workflow ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleViewWorkflow(rowIdx)}
              disabled={saving || loading}
              sx={{ fontSize: 'small' }}
            >
              View Workflow
            </Button>
          ) : (
            <Box sx={{ minWidth: '140.5px' }} />
          );
        default:
          return null;
      }
    },
    [
      assetCategoryFacilities,
      data.rows,
      loading,
      saving,
      workflows,
      getSelectDropdown,
      handleFacilityChange,
      handleWorkflowChange,
      handleViewWorkflow,
    ]
  );

  return (
    <Card>
      <CardHeader title="Facility" />
      <CardContent sx={{ pt: 0, position: 'relative' }}>
        <LoadingPanel
          show={loadingAssetCategoryFacilities || loadingWorkflows}
        />
        <DataTable
          name="collection form facility"
          /* filter table columns by current facility type */
          columns={columns}
          /* can edit all cells in facility table */
          editableColLabels={columns.map((col: IDataTableColumn) => col.label)}
          /* build table row props from facility data */
          rows={data.rows?.map((facility: ICollectionFormFacilityData) => ({
            label: facility.asset_category,
          }))}
          isLoading={loading}
          error={error}
          editCellValueCallback={handleEditCellValue}
          getCellValueCallback={handleGetCellValue}
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

export default CollectionFormFacility;
