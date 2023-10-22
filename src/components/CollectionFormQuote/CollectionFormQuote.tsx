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
  IconButton,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  IQuoteSummaryData,
  IQuotePricesData,
  IQuotePricedModelData,
  ICollectionFormQuoteData,
  IQuoteConflictsData,
} from '@/lib/api/api-types';
import { getCollectionFormQuotePostData } from '@/utils';
import {
  saveByCollectionId as saveQuoteByCollectionId,
  resetQuote,
  editQuoteConflicts,
  addSelectedQuote,
  removeSelectedQuote,
  applyConflictingQuote,
} from '@/redux/slices/collectionFormQuoteSlice';
import DataTable from '@/components/DataTable/DataTable';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import columns from './collectionFormQuoteTableColumns';
import quoteSelectColumns from './collectionFormQuoteSelectionTableColumns';

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
  const {
    data,
    loading,
    error,
    saving,
    edited,
    conflictsRows,
    selectedQuotes,
    availableQuotes,
  } = useSelector((state: AppState) => state.collectionFormQuote);

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
   * Helper function for rendering Quote Select table dropdown menu
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @return {ReactNode} - select quote dropdown menu
   */
  const getSelectQuoteDropdown = useCallback(
    () =>
      availableQuotes.length > 0 ? (
        <FormControl variant="standard" fullWidth>
          <InputLabel id="quote-select-input-label">Quote Select</InputLabel>
          <Select
            labelId="quote-select-input-label"
            id="demo-simple-select"
            inputProps={{ 'aria-label': `quote-select-input` }}
            label="Quote Select"
            color="secondary"
            onChange={(event: SelectChangeEvent) =>
              dispatch(addSelectedQuote({ quoteId: event.target.value }))
            }
            displayEmpty
            defaultValue=""
          >
            {availableQuotes.map((quote) => (
              <MenuItem key={`Quote - ${quote.id}`} value={quote.id}>
                Quote - {quote.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Typography fontSize={11}>All quotes selected</Typography>
      ),
    [availableQuotes, dispatch]
  );

  /**
   * Helper function for rendering Apply Quote table action button
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @prop {string} quoteIdString - quote ID to be rendered next to button
   * @prop {number} rowIdx - table row index of quote price to be applied
   * @prop {string} modelId - model for which this apply action updates
   * @return {ReactNode} - select quote dropdown menu
   */
  const getConflictsApplyButton = useCallback(
    (quoteIdString: string, rowIdx: number, modelId: string) => (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(applyConflictingQuote({ rowIdx, modelId }))}
          sx={{ fontSize: 'small' }}
        >
          Apply
        </Button>
        <Typography width={200} ml={2}>
          {quoteIdString}
        </Typography>
      </Box>
    ),
    [dispatch]
  );

  /**
   * Handles any required logic when determining Quote Select table cell value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @param {number} rowIdx - table row index to get value from
   * @param {IDataTableColumn} column - column to get value from
   * @return {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const handleGetSelectQuoteCellValue = useCallback(
    (rowIdx: number, column: IDataTableColumn): DataTableRowCellValue => {
      /* return null if action button, otherwise grab quote ID value */
      if (column.key === 'delete') return null;
      /* return dropdown if last column in table */
      if (selectedQuotes.length <= rowIdx) return getSelectQuoteDropdown();
      return `Quote - ${selectedQuotes[rowIdx].id}`;
    },
    [selectedQuotes, getSelectQuoteDropdown]
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
      if (conflictsRows === null) return null;
      /* return name, otherwise grab passed price col */
      if (column.key === 'display_name') {
        /* name col can either be a model or a quote */
        if ('model' in conflictsRows[rowIdx]) {
          return (
            (conflictsRows[rowIdx] as IQuotePricedModelData).model
              .display_name || 'N/A'
          );
        }
        if ('quote' in conflictsRows[rowIdx]) {
          return getConflictsApplyButton(
            `Quote - ${
              (conflictsRows[rowIdx] as IQuoteConflictsData).quote.id
            }`,
            rowIdx,
            conflictsRows[rowIdx].modelId
          );
        }
      }
      return conflictsRows[rowIdx]?.prices[
        column.key as keyof IQuotePricesData
      ];
    },
    [conflictsRows, getConflictsApplyButton]
  );

  /**
   * Handles requests for the delete action button for quote select table
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @param {string} colKey - table column key of the action cell
   * @param {number} rowIdx - table row index of the action cell
   * @returns {ReactNode} - action component to present
   */
  const getSelectQuoteActionButton = useCallback(
    (colKey: string, rowIdx: number) => {
      /* don't return dropdown if last row in table */
      if (selectedQuotes.length <= rowIdx) return null;
      return (
        <IconButton
          aria-label="delete"
          onClick={() =>
            dispatch(
              removeSelectedQuote({ quoteId: selectedQuotes[rowIdx].id })
            )
          }
        >
          <DeleteIcon />
        </IconButton>
      );
    },
    [selectedQuotes, dispatch]
  );

  /**
   * Handles whether or not passed conflicts tabel cell can be edited
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.19
   *
   * @method
   * @param {string} colKey - column key to be updated
   * @param {number} rowIdx - table row index to be updated
   * @returns {boolean} - whether cell is editable
   */
  const canEditConflictCell = useCallback(
    (colKey: string, rowIdx: number): boolean =>
      Boolean((conflictsRows[rowIdx] as IQuotePricedModelData).model),
    [conflictsRows]
  );

  return (
    <Card>
      <CardHeader title="Quote" />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h6" mb={1}>
          Select Quotes
        </Typography>
        <Box maxWidth={300}>
          <DataTable
            name="collection form quote selection"
            columns={quoteSelectColumns}
            /* table editable cell(s) is the collection charge column */
            editableColLabels={[]}
            /* build table row props from quote preview data */
            rows={selectedQuotes
              .map((quote: IQuoteSummaryData) => ({
                label: quote.id,
              }))
              .concat({ label: 'quote-select-dropdown' })}
            isLoading={loading}
            error={error}
            getCellValueCallback={handleGetSelectQuoteCellValue}
            getActionComponent={getSelectQuoteActionButton}
          />
        </Box>
        <Typography variant="h6" mt={2} mb={1}>
          Preview
        </Typography>
        <DataTable
          name="collection form quote preview"
          columns={columns}
          /* table editable cell(s) is the collection charge column */
          editableColLabels={[]}
          /* build table row props from quote preview data */
          rows={data?.preview.map((item: IQuotePricedModelData) => ({
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
            <Box mb={0.5}>
              <DataTable
                name="collection form quote conflicts"
                columns={columns}
                /* table editable cell(s) are price cols */
                editableColLabels={[
                  'Fully Working',
                  'Customer Charge',
                  'Project Charge',
                  'Collection Charge',
                ]}
                /* build table row props from quote preview data */
                rows={conflictsRows.map(
                  (conflict: IQuotePricedModelData | IQuoteConflictsData) => ({
                    label: `${
                      'model' in conflict
                        ? conflict?.model?.id
                        : conflict?.quote.id
                    }-model-quote-id`,
                  })
                )}
                isLoading={loading}
                error={error}
                editCellValueCallback={handleEditCellValue}
                getCellValueCallback={handleGetConflictsCellValue}
                canEditCellValueCallback={canEditConflictCell}
              />
            </Box>
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
