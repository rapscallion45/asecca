import { FC, useState, useCallback, ReactNode } from 'react';
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
  Backdrop,
  CircularProgress,
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
} from '@/redux/slices/collectionFormFacilitySlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import columns from './collectionFormFacilityTableColumns';

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
    loading,
    error,
    saving,
    edited,
    loadingAssetCategoryFacilities,
    assetCategoryFacilities,
    loadingWorkflows,
    workflows,
  } = useSelector((state: AppState) => state.collectionFormFacility);

  /* on first load, fetch the asset categories */
  // useEffect(() => {
  //   dispatch(fetchFacilities());
  //   dispatch(fetchWorkflows());
  // }, [dispatch]);

  /**
   * Table column list
   *
   * Local state of columns list for available facility and workflow options
   *
   * @since 0.0.17
   *
   * @constant
   */
  const [colList] = useState<Array<IDataTableColumn>>(columns);

  /* Whenever Facility data updates, update column list */
  //   useEffect(() => {
  //     setColList(
  //       columns.map((col: IDataTableColumn) => {
  //         if (col.key === 'facility')
  //           return {
  //             ...col,
  //             selectOptions: assetFacilities,
  //           };
  //         if (col.key === 'workflow')
  //           return {
  //             ...col,
  //             selectOptions: assetWorkflows,
  //           };
  //         return col;
  //       })
  //     );
  //   }, [data]);

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
    (value: DataTableRowCellValue, colKey: string, rowIdx: number) => {
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
   * @param {(SelectChangeEvent, string, number) => void} handleChange - handle select change callback
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
          renderValue={(selectValue: string) =>
            /* if current value is undefined, display the unassigned text */
            selectValue === undefined || selectValue === '' ? (
              <MenuItem value="">
                {columns.find((col: IDataTableColumn) => col.key === colKey)
                  ?.unassignedText || ''}
              </MenuItem>
            ) : (
              /* we have a value, display it */
              <MenuItem value={selectValue}>{selectValue}</MenuItem>
            )
          }
          onChange={(event: SelectChangeEvent) =>
            handleChange(event, colKey, rowIdx)
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
            <Typography>Please select a facility</Typography>
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
        <Backdrop
          open={loadingAssetCategoryFacilities || loadingWorkflows}
          sx={{ position: 'absolute', zIndex: '999' }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DataTable
          name="collection form facility"
          /* filter table columns by current facility type */
          columns={colList}
          /* can edit all cells in facility table */
          editableColLabels={colList.map((col: IDataTableColumn) => col.label)}
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
