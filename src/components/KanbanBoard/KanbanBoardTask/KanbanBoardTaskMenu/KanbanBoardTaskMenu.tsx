import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
// import { AppState } from '@/redux/store';
import { IAddKanbanBoardTaskPayload } from '@/redux/types';
import { deleteTask } from '@/redux/slices/kanbanSlice';
import MenuPopover from '@/components/MenuPopover/MenuPopover';
import ConfirmDialog from '@/modals/ConfirmModal/ConfirmModal';
import FormDialog from '@/modals/FormModal/FormModal';
import { ModalButtonIconSizeType } from '@/modals/types';
import KanbanBoardTaskForm from '../KanbanBoardTaskForm/KanbanBoardTaskForm';

/**
 * Kanban Board Task Menu Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IKanbanBoardTaskMenuProps
 * @prop {number} colIndex - column index of this task
 * @prop {number} taskIndex - index of task
 * @prop {IAddKanbanBoardTaskPayload} currentData - current task data
 * @prop {ModalButtonIconSizeType} iconSize - passed props
 */
interface IKanbanBoardTaskMenuProps {
  colIndex: number;
  taskIndex: number;
  currentData: IAddKanbanBoardTaskPayload;
  iconSize?: ModalButtonIconSizeType;
}

/**
 * Kanban Board Task Menu
 *
 * Kanbaord board task menu interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @component
 * @param {IKanbanBoardTaskMenuProps} props - component props
 * @returns {FC} - kanban board task menu functional component
 */
const KanbanBoardTaskMenu: FC<IKanbanBoardTaskMenuProps> = (props) => {
  const { colIndex, taskIndex, currentData, iconSize } = props;
  const dispatch = useDispatch();
  // const { deleting } = useSelector((state: AppState) => state.bugs);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (
    deleteColIndex: number,
    deleteTaskIndex: number,
    closeDialog: () => void
  ) => {
    dispatch(
      deleteTask({ colIndex: deleteColIndex, taskIndex: deleteTaskIndex })
    );
    closeDialog();
  };

  return (
    <>
      <IconButton
        size="small"
        color={anchorEl ? 'primary' : 'default'}
        onClick={handleOpenMenu}
        sx={{
          ...(Boolean(anchorEl) && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <MoreVertIcon fontSize={iconSize || 'medium'} />
      </IconButton>
      <MenuPopover
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        keepMounted
        anchorEl={anchorEl}
        sx={{ width: 220 }}
      >
        <FormDialog
          triggerBtn={{
            type: 'menu',
            // @ts-ignore
            icon: EditOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            text: 'Edit Task Info',
            closeMenu: handleCloseMenu,
          }}
          title="Edit Task Info"
        >
          <KanbanBoardTaskForm
            isEditMode
            currentData={currentData}
            closeModal={handleCloseMenu}
          />
        </FormDialog>
        <ConfirmDialog
          title="Confirm Delete Task"
          contentText="Are you sure you want to permanently delete this task?"
          actionBtnText="Delete"
          triggerBtn={{
            type: 'menu',
            text: 'Delete Task',
            // @ts-ignore
            icon: DeleteOutlineIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          // processing={deleting}
          actionFunc={(closeDialog) =>
            handleDelete(colIndex, taskIndex, closeDialog)
          }
        />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleCloseMenu}
          >
            Close
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};
export default KanbanBoardTaskMenu;
