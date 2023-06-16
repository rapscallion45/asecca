import { FC, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { IKanbanBoard, IKanbanBoardColumn } from './types';
import useKanbanBoardFormController from './KanbanBoardFormController';

/**
 * Kanban Board Form Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 *
 * @typedef IKanbanBoardFormProps
 * @prop {boolean} isEditMode - determines whether this is a new board or editing
 * @prop {IKanbanBoard} currentData - current board data
 * @prop {any} closeModal - on close modal callback handler
 */
interface IKanbanBoardFormProps {
  isEditMode: boolean;
  currentData?: IKanbanBoard;
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
  const { isEditMode, currentData, closeModal } = props;
  const [newColumns, setNewColumns] = useState<Array<IKanbanBoardColumn>>(
    currentData?.columns || [
      { name: 'Todo', id: uuidv4() },
      { name: 'In Progress', id: uuidv4() },
      { name: 'Completed', id: uuidv4() },
    ]
  );
  const { saving, formik } = useKanbanBoardFormController(
    isEditMode,
    newColumns,
    currentData,
    closeModal
  );

  /**
   * Callback handler for user input updates to columns
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @method
   * @param {string} id - column ID that has been updated
   * @param {string} newValue - updated value for column name
   */
  const onChange = useCallback((id: string, newValue: string) => {
    setNewColumns((prevState: Array<IKanbanBoardColumn>) => {
      const newState = [...prevState];
      const column = newState.find((col: IKanbanBoardColumn) => col.id === id);
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
   * @param {string} id - column ID to be deleted
   */
  const onDelete = useCallback((id: string) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
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
        {newColumns.map((column: IKanbanBoardColumn) => (
          <Box key={column.id}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Input
                id="board-columns-form"
                type="text"
                value={column.name}
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                placeholder="Enter column name..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="delete column"
                      onClick={() => {
                        onDelete(column.id);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
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
                { name: '', tasks: [], id: uuidv4() },
              ]);
            }}
            fullWidth
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
          disabled={saving}
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
          disabled={saving}
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
