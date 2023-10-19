import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  ICollectionFormQuoteConflictsData,
  ICollectionFormQuoteData,
  IQuoteModelFullData,
  IQuotePricesData,
} from '@/lib/api/api-types';
import { getCollectionFormQuotePostData } from '@/utils';
import {
  saveByCollectionId as saveQuoteByCollectionId,
  resetQuote,
  editQuoteConflicts,
} from '@/redux/slices/collectionFormQuoteSlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import columns from './collectionFormQuoteTableColumns';

/**
 * Collection Form Quote Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteProps
 * @prop {string} collectionId - ID string of Collection for table data API call
 */
interface ICollectionFormQuoteProps {
  collectionId: string;
}

/**
 * Collection Form Quote
 *
 * Presents the Collection Form Quote to the user, populated with data
 * fetched from API: /api/collection/quote/api/quote
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @component
 * @param {ICollectionFormQuoteProps} props - component props
 * @returns {FC} - collection form quote functional component
 */
const CollectionFormQuote: FC<ICollectionFormQuoteProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form quote data held in redux state */
  const { data, loading, error, saving, edited } = useSelector(
    (state: AppState) => state.collectionFormQuote
  );

  /**
   * Handles the saving of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveQuoteByCollectionId({
        data: getCollectionFormQuotePostData(
          collectionId,
          '10/9/2023',
          data as ICollectionFormQuoteData
        ),
      })
    );
  }, [collectionId, data, dispatch]);

  /**
   * Handles the resetting of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   */
  const handleReset = useCallback(() => {
    dispatch(resetQuote());
  }, [dispatch]);

  /**
   * Handles the update of the table data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @param {DataTableRowCellValue} value - value to be used in update
   * @param {string} colKey - column key to be updated
   * @param {number} rowIdx - table row index to be updated
   */
  const handleEditCellValue = useCallback(
    (value: DataTableRowCellValue, colKey: string, rowIdx: number) => {
      dispatch(
        editQuoteConflicts({
          value: value !== '--' ? value : null,
          colKey: colKey as keyof ICollectionFormQuoteData,
          rowIdx,
        })
      );
    },
    [dispatch]
  );

  /**
   * Handles any required logic when determining Preview table cell value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetPreviewCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue => {
      /* return name, otherwise grab passed price col */
      if (column.key === 'display_name')
        return data.preview[rowIdx].model.display_name;
      return data.preview[rowIdx].prices[column.key as keyof IQuotePricesData];
    },
    [data]
  );

  /**
   * Handles any required logic when determining Conflicts table cell value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetConflictsCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue => {
      /* return name, otherwise grab passed price col */
      if (column.key === 'display_name')
        return data.preview[rowIdx].model.display_name;
      return data.preview[rowIdx].prices[column.key as keyof IQuotePricesData];
    },
    [data]
  );

  return (
    <Card>
      <CardHeader title="Quote" />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h6" mb={1}>
          Preview
        </Typography>
        <DataTable
          name="collection form quote preview"
          columns={columns}
          /* table editable cell(s) is the collection charge column */
          editableColLabels={[]}
          /* build table row props from quote preview data */
          rows={data?.preview.map((item: IQuoteModelFullData) => ({
            label: item.model.id,
          }))}
          isLoading={loading}
          error={error}
          getCellValueCallback={handleGetPreviewCellValue}
        />
        {data.conflicts.length > 0 && (
          <>
            <Typography variant="h6" mt={2} mb={1}>
              Resolve Conflicts
            </Typography>
            <DataTable
              name="collection form quote conflicts"
              columns={columns}
              /* table editable cell(s) is the collection charge column */
              editableColLabels={[]}
              /* build table row props from quote preview data */
              rows={data?.conflicts.map(
                (conflict: ICollectionFormQuoteConflictsData) => ({
                  label: `${conflict.model.model.id}-model-id`,
                })
              )}
              isLoading={loading}
              error={error}
              editCellValueCallback={handleEditCellValue}
              getCellValueCallback={handleGetConflictsCellValue}
            />
          </>
        )}
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

export default CollectionFormQuote;
