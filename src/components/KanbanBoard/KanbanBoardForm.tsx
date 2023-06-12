import { FC } from 'react';
import {
  Button,
  InputAdornment,
  CircularProgress,
  TextField,
} from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { IKanbanBoard } from '@/lib/api/api-types';
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
  const { saving, formik } = useKanbanBoardFormController(
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

export default KanbanBoardForm;
