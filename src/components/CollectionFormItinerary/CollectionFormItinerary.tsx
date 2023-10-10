import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import CategoryIcon from '@mui/icons-material/Category';
import { ICollectionFormItineraryData } from '@/lib/api/api-types';
import {
  saveByCollectionId as saveItineraryByCollectionId,
  resetItinerary,
  editItinerary,
  addItinerary,
  deleteItinerary,
  fetchTypes,
} from '@/redux/slices/collectionFormItinerarySlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import FormModal from '@/modals/FormModal/FormModal';
import NewAssetCategoryModalModal from '../NewAssetCategoryModal.tsx/NewAssetCategoryModal';
import columns from './collectionFormItineraryTableColumns';

/**
 * Collection Form Itinerary Data Table Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryTableProps
 * @prop {string} collectionId - ID string of Collection for table data API call
 */
interface ICollectionFormItineraryTableProps {
  collectionId: string;
}

/**
 * Collection Form Itinerary Data Table
 *
 * Presents the Collection Form Itinerary table to the user, populated with data
 * fetched from API: /api/collection/itinerary/api/itinerary
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @component
 * @param {ICollectionFormItineraryTableProps} props - component props
 * @returns {FC} - collection form itinerary table functional component
 */
const CollectionFormItinerary: FC<ICollectionFormItineraryTableProps> = (
  props
) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form logisitcs data held in redux state */
  const { data, loading, error, saving, edited, assetCategories } = useSelector(
    (state: AppState) => state.collectionFormItinerary
  );

  /* on first load, fetch the asset categories */
  // useEffect(() => {
  //   dispatch(fetchTypes());
  // }, [dispatch]);

  /**
   * Table column list
   *
   * Local state of columns list for available itinerary and asset categories
   *
   * @since 0.0.15
   *
   * @constant
   */
  const [colList, setColList] = useState<Array<IDataTableColumn>>(columns);

  /* Whenever Logisitcs data updates, update column list */
  useEffect(() => {
    setColList(
      columns.map((col: IDataTableColumn) => {
        if (col.key === 'asset_category')
          return {
            ...col,
            selectOptions: assetCategories,
          };
        return col;
      })
    );
  }, [data, assetCategories]);

  /**
   * Handles the saving of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveItineraryByCollectionId({
        data: {
          collection: collectionId,
          items: data,
        },
      })
    );
  }, [collectionId, data, dispatch]);

  /**
   * Handles the resetting of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   */
  const handleReset = useCallback(() => {
    dispatch(resetItinerary());
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
      dispatch(editItinerary({ value, colKey, rowIdx }));
    },
    [dispatch]
  );

  /**
   * Handles any required logic when determining a cell's display value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue =>
      data[rowIdx][column.key as keyof ICollectionFormItineraryData],
    [data]
  );

  /**
   * Handles addition of table row for new Itinerary type
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
   *
   * @method
   */
  const handleAddRow = useCallback(() => dispatch(addItinerary()), [dispatch]);

  /**
   * Handles deletion of table row for passed row index
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
   *
   * @method
   * @param {number} rowIdx - table row index to be deleted
   */
  const handleDeleteRow = useCallback(
    (rowIdx: number) => dispatch(deleteItinerary({ rowIdx })),
    [dispatch]
  );

  /**
   * Handles requests for the action component for specific column
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
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

  /**
   * Handles closure events of the New Asset Category modal
   *
   * If new asset category has been added, this should trigger new fetch
   * of the asset category data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @method
   */
  const handleCloseNewAssetCategoryModal = (fetchNewTypes: boolean) => {
    if (fetchNewTypes) fetchTypes();
  };

  return (
    <Card>
      <CardHeader title="Itinerary" />
      <CardContent sx={{ pt: 0 }}>
        <DataTable
          name="collection form itinerary"
          /* filter table columns by current itinerary type */
          columns={colList}
          /* can edit all cells in itinerary table */
          editableColLabels={colList.map((col: IDataTableColumn) => col.label)}
          /* build table row props from itinerary data */
          rows={data?.map((itinerary: ICollectionFormItineraryData) => ({
            label: itinerary.asset_category,
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
            variant="contained"
            onClick={handleAddRow}
            disabled={saving || loading}
            sx={{ minWidth: '80.61px', mr: 2 }}
          >
            Add +
          </Button>
          <FormModal
            triggerBtn={{
              type: 'menu',
              // @ts-ignore
              icon: CategoryIcon,
              iconStyle: { marginRight: '10px' },
              text: 'Add Asset Category +',
              closeMenu: () => {},
            }}
            title="New Asset Category"
          >
            <NewAssetCategoryModalModal
              closeModal={handleCloseNewAssetCategoryModal}
            />
          </FormModal>
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

export default CollectionFormItinerary;
