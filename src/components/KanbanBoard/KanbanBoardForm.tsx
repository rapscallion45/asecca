import { FC, useState, useCallback } from 'react';
import {
  Box,
  IconButton,
  Button,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  CircularProgress,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { IKanbanBoardColumn } from '@/lib/api/api-types';
import { IKanbanBoardState } from '@/redux/types';
import useKanbanBoardFormController from './KanbanBoardFormController';
import { useSliceSelector } from '../SliceProvider/SliceProvider';

/**
 * Kanban Board Form Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 *
 * @typedef IKanbanBoardFormProps
 * @prop {boolean} isEditMode - determines whether this is a new board or editing
 * @prop {boolean} canEdit - board data can be edited
 * @prop {any} closeModal - on close modal callback handler
 */
interface IKanbanBoardFormProps {
  isEditMode: boolean;
  canEdit?: boolean;
  closeModal?: () => void;
}

/**
 * Kanban Board Form
 *
 * Kanban board form interface for collecting user input when creating
 * or editing a board's details
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 *
 * @component
 * @param {IKanbanBoardFormProps} props - component props
 * @returns {FC} - kanaban board form functional component
 */
const KanbanBoardForm: FC<IKanbanBoardFormProps> = (props) => {
  const { isEditMode, canEdit = false, closeModal } = props;
  const { data: currentData } = useSliceSelector() as IKanbanBoardState;
  const [newColumns, setNewColumns] = useState<Array<IKanbanBoardColumn>>(
    currentData?.columns || [
      { name: 'Todo', tasks: [] },
      { name: 'In Progress', tasks: [] },
      { name: 'Completed', tasks: [] },
    ]
  );
  const { saving, formik } = useKanbanBoardFormController(
    isEditMode,
    newColumns,
    closeModal
  );

  /**
   * Callback handler for user input updates to columns
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @method
   * @param {string} colIdx - column index that has been updated
   * @param {string} newValue - updated value for column name
   */
  const onChange = useCallback((colIdx: number, newValue: string) => {
    setNewColumns((prevState: Array<IKanbanBoardColumn>) => {
      const newState = [...prevState];
      const column = newState.find(
        (col: IKanbanBoardColumn, index: number) => index === colIdx
      );
      if (column) column.name = newValue;
      return newState;
    });
  }, []);

  /**
   * Callback handler for column deletion
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @method
   * @param {number} id - column ID to be deleted
   */
  const onDelete = useCallback((colIdx: number) => {
    setNewColumns((prevState) =>
      prevState.filter(
        (el: IKanbanBoardColumn, index: number) => index !== colIdx
      )
    );
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id="name"
        name="name"
        label="Board Name"
        type="text"
        disabled={!canEdit}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        autoComplete="on"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelImportantIcon color="secondary" />
            </InputAdornment>
          ),
        }}
      />
      <Box mt={2}>
        <Typography>Board Columns</Typography>
        {newColumns.map((column: IKanbanBoardColumn, index: number) => (
          <Box key={column.name}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Input
                id="board-columns-form"
                type="text"
                value={column.name}
                onChange={(e) => {
                  onChange(index, e.target.value);
                }}
                disabled={!canEdit}
                placeholder="Enter column name..."
                endAdornment={
                  <InputAdornment position="end">
                    {canEdit && (
                      <IconButton
                        aria-label="delete column"
                        data-testid={`delete-column-${column.name}`}
                        onClick={() => {
                          onDelete(index);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewColumns((state: Array<IKanbanBoardColumn>) => [
                ...state,
                { name: '', tasks: [], groups: [] },
              ]);
            }}
            fullWidth
            disabled={!canEdit}
          >
            + Add New Column
          </Button>
        </Box>
      </Box>
      {!isEditMode ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={saving || !canEdit}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!saving && 'Add Board'}
          {saving && <CircularProgress size={25} color="inherit" />}
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={saving || !canEdit}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!saving && 'Update'}
          {saving && <CircularProgress size={25} color="inherit" />}
        </Button>
      )}
    </form>
  );
};

export default KanbanBoardForm;
