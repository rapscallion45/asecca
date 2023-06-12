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
import SubjectIcon from '@mui/icons-material/Subject';
import { IEditKanbanBoardTaskPayload } from '@/redux/types';
import useKanbanBoardTaskFormController from './KanbanBoardTaskFormController';

/**
 * Kanban Board Task Form Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IKanbanBoardTaskFormProps
 * @prop {boolean} isEditMode - determines whether this is a new task or editing
 * @prop {IEditKanbanBoardTaskPayload} currentData - task data
 * @prop {any} closeModal - on close modal callback handler
 */
interface IKanbanBoardTaskFormProps {
  isEditMode: boolean;
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
  const { isEditMode, currentData, closeModal } = props;
  const { saving, formik } = useKanbanBoardTaskFormController(
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
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
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
