import { FC } from 'react';
import {
  Button,
  InputAdornment,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { IEditKanbanBoardTaskPayload } from '@/redux/types';
import { IKanbanBoardColumn } from '../../types';
import useKanbanBoardTaskFormController from './KanbanBoardTaskFormController';

/**
 * Kanban Board Task Form Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IKanbanBoardTaskFormProps
 * @prop {boolean} isEditMode - determines whether this is a new task or editing
 * @param {boolean} saving - board saving state flag
 * @prop {Array<IKanbanBoardColumn>} columns - columns for task's board
 * @prop {IEditKanbanBoardTaskPayload} currentData - task data
 * @prop {any} closeModal - on close modal callback handler
 */
interface IKanbanBoardTaskFormProps {
  isEditMode: boolean;
  saving: boolean;
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
  const { isEditMode, saving, columns, currentData, closeModal } = props;
  const { formik } = useKanbanBoardTaskFormController(
    isEditMode,
    currentData,
    closeModal
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id="name"
        name="name"
        label="Task Name"
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
