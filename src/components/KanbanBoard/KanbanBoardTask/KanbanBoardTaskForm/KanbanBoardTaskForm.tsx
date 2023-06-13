import { FC, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  InputAdornment,
  CircularProgress,
  TextField,
  Typography,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import SubjectIcon from '@mui/icons-material/Subject';
import { IEditKanbanBoardTaskPayload } from '@/redux/types';
import { IKanbanBoardColumn, IKanbanBoardSubtask } from '@/lib/api/api-types';
import useKanbanBoardTaskFormController from './KanbanBoardTaskFormController';

/**
 * Kanban Board Task Form Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IKanbanBoardTaskFormProps
 * @prop {boolean} isEditMode - determines whether this is a new task or editing
 * @prop {Array<IKanbanBoardColumn>} columns - columns for task's board
 * @prop {IEditKanbanBoardTaskPayload} currentData - task data
 * @prop {any} closeModal - on close modal callback handler
 */
interface IKanbanBoardTaskFormProps {
  isEditMode: boolean;
  columns: Array<IKanbanBoardColumn>;
  currentData?: IEditKanbanBoardTaskPayload;
  closeModal?: () => void;
}

/**
 * Kanban Board Task Form
 *
 * Kanban board task form interface for collecting user input when creating
 * or editing a task's details
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @component
 * @param {IKanbanBoardTaskFormProps} props - component props
 * @returns {FC} - kanaban board task form functional component
 */
const KanbanBoardTaskForm: FC<IKanbanBoardTaskFormProps> = (props) => {
  const { isEditMode, columns, currentData, closeModal } = props;
  const [newSubtasks, setNewSubtasks] = useState<Array<IKanbanBoardSubtask>>(
    currentData?.subtasks || []
  );
  const { saving, formik } = useKanbanBoardTaskFormController(
    isEditMode,
    columns,
    newSubtasks,
    currentData,
    closeModal
  );

  /**
   * Callback handler for user input updates to subtasks
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @param {string} id - subtask ID that has been updated
   * @param {string} newValue - updated value for subtask title
   */
  const onChange = useCallback((id: string, newValue: string) => {
    setNewSubtasks((prevState: Array<IKanbanBoardSubtask>) => {
      const newState = [...prevState];
      const subtask = newState.find(
        (subtaskItem: IKanbanBoardSubtask) => subtaskItem.id === id
      );
      if (subtask) subtask.title = newValue;
      return newState;
    });
  }, []);

  /**
   * Callback handler for subtask deletion
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @param {string} id - subtask ID to be deleted
   */
  const onDelete = useCallback((id: string) => {
    setNewSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id="title"
        name="title"
        label="Task Title"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        autoComplete="on"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelImportantIcon color="secondary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        margin="normal"
        id="description"
        name="description"
        label="Description"
        type="text"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description || formik.errors.description}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubjectIcon color="secondary" />
            </InputAdornment>
          ),
        }}
      />
      <Box my={2}>
        <Typography>Subtasks</Typography>
        {newSubtasks.length > 0 &&
          newSubtasks?.map((subtask: IKanbanBoardSubtask) => (
            <Box key={subtask.id}>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <Input
                  id="task-subtask-form"
                  type="text"
                  value={subtask.title}
                  onChange={(e) => {
                    onChange(subtask.id, e.target.value);
                  }}
                  placeholder="Enter subtask title..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="delete subtask"
                        onClick={() => {
                          onDelete(subtask.id);
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
              setNewSubtasks((state: Array<IKanbanBoardSubtask>) => [
                ...state,
                { title: '', isCompleted: false, id: uuidv4() },
              ]);
            }}
            fullWidth
          >
            + Add New Subtask
          </Button>
        </Box>
      </Box>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="status-label">Current Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          value={formik.values.status}
          label="Current Status"
          onChange={formik.handleChange}
        >
          {columns.map((col: IKanbanBoardColumn) => (
            <MenuItem key={col.id} value={col.name}>
              {col.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!isEditMode ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={saving}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!saving && 'Add Task'}
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

export default KanbanBoardTaskForm;
