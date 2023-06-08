import React, { FC, useState } from 'react';
import {
  Box,
  IconButton,
  Button,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addBoard, editBoard } from '@/redux/slices/kanbanSlice';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { IKanbanBoardColumn } from '@/lib/api/api-types';
import { AppState } from '@/redux/store';

/**
 * Add Edit Board Modal Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IAddEditBoardModalProps
 * @prop {string} type - flag to show or hide logo
 * @prop {boolean} open - flag to show if modal is currently open
 * @prop {INavBarOnSidebarOpenCallback} setIsBoardModalOpen - callback handler for setting modal open
 */
interface IAddEditBoardModalProps {
  type: string;
  open: boolean;
  setIsBoardModalOpen: (open: boolean) => void;
}

/**
 * Add Edit Board Modal
 *
 * Kanban Board interface add board modal component
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IAddEditBoardModalProps} props - component props
 * @returns {FC} - kanban board add board functional component
 */
const AddEditBoardModal: FC<IAddEditBoardModalProps> = (props) => {
  const { type, open, setIsBoardModalOpen } = props;
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [name, setName] = useState<string>('New Board');
  const [newColumns, setNewColumns] = useState<Array<IKanbanBoardColumn>>([
    { name: 'Todo', tasks: [], id: uuidv4() },
    { name: 'In Progress', tasks: [], id: uuidv4() },
    { name: 'Completed', tasks: [], id: uuidv4() },
  ]);
  const { data: kanbanData } = useSelector((state: AppState) => state.kanban);
  const activeBoard = kanbanData.boards?.find((board) => board.isActive);

  /* on first load, prepare default columns for new board */
  if (type === 'edit' && isFirstLoad) {
    setNewColumns(
      activeBoard?.columns.map((col: IKanbanBoardColumn) => ({
        ...col,
        id: uuidv4(),
      })) || []
    );
    setName(activeBoard?.name || 'New Board');
    setIsFirstLoad(false);
  }

  /**
   * Checks whether user entries are in the correct format
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @returns {boolean} - whether user entry is validated
   */
  const validate = () => {
    if (!name.trim()) {
      return false;
    }
    return !newColumns.some(
      (newColumn: IKanbanBoardColumn) => !newColumn.name.trim()
    );
  };

  /**
   * Callback handler for user input updates
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {string} id - column id that has been updated
   * @param {string} newValue - updated value for column name
   */
  const onChange = (id: string, newValue: string) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      if (column) column.name = newValue;
      return newState;
    });
  };

  /**
   * Callback handler for column deletion
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {string} id - column ID to be deleted
   */
  const onDelete = (id: string) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  /**
   * Callback handler for board creation submission
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {string} submitType - add or edit board submission type
   */
  const onSubmit = (submitType: string) => {
    if (submitType === 'add') {
      dispatch(addBoard({ name, newColumns }));
    } else {
      dispatch(editBoard({ name, newColumns }));
    }
  };

  /**
   * Callback handler for processing submission requests
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   */
  const handleSubmit = () => {
    if (validate()) onSubmit(type);
    setIsBoardModalOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setIsBoardModalOpen(false)}>
      <DialogTitle>
        {type === 'edit' ? 'Edit' : 'Add New'} Kanban Board
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Board Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!name.length}
          helperText={!name.length ? 'Board name is required' : ''}
        />
        <Box mt={2}>
          <Typography>Board Columns</Typography>
          {newColumns.map((column: IKanbanBoardColumn) => (
            <Box key={column.id}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <Input
                  id="standard-adornment-password"
                  type="text"
                  value={column.name}
                  onChange={(e) => {
                    onChange(column.id, e.target.value);
                  }}
                  placeholder="Enter column name..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
                setNewColumns((state) => [
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
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setIsBoardModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={!name.length}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          Create Board
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditBoardModal;
