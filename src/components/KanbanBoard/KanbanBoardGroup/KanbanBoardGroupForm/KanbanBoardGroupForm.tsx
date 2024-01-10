import { FC } from 'react';
import {
  Button,
  InputAdornment,
  CircularProgress,
  TextField,
} from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { IEditKanbanBoardGroupPayload } from '@/redux/types';
import { IKanbanBoardColumn } from '@/lib/api/api-types';
import useKanbanBoardTaskFormController from './KanbanBoardGroupFormController';

/**
 * Kanban Board Group Form Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @typedef IKanbanBoardGroupFormProps
 * @prop {boolean} isEditMode - determines whether this is a new group or editing
 * @prop {boolean} canEdit - group can be edited
 * @prop {Array<IKanbanBoardColumn>} columns - columns for group's board
 * @prop {IEditKanbanBoardGroupPayload} editData - group data to be edited
 * @prop {any} closeModal - on close modal callback handler
 */
interface IKanbanBoardGroupFormProps {
  isEditMode: boolean;
  canEdit?: boolean;
  columns: Array<IKanbanBoardColumn>;
  editData?: IEditKanbanBoardGroupPayload;
  closeModal?: () => void;
}

/**
 * Kanban Board Group Form
 *
 * Kanban board group form interface for collecting user input when creating
 * or editing a group's details
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @component
 * @param {IKanbanBoardGroupFormProps} props - component props
 * @returns {FC} - kanaban board group form functional component
 */
const KanbanBoardTaskForm: FC<IKanbanBoardGroupFormProps> = (props) => {
  const { isEditMode, canEdit = false, columns, editData, closeModal } = props;
  const { saving, formik } = useKanbanBoardTaskFormController(
    isEditMode,
    columns,
    editData,
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
        label="Group Name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        autoComplete="on"
        disabled={!canEdit}
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
          disabled={saving || !canEdit}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!saving && 'Add Group'}
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

export default KanbanBoardTaskForm;
