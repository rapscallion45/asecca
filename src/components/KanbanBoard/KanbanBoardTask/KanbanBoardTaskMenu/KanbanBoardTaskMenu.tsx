import { FC, useState, useCallback, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
import { IEditKanbanBoardTaskPayload, IKanbanBoardState } from '@/redux/types';
import { AppDispatch } from '@/redux/store';
import MenuPopover from '@/components/MenuPopover/MenuPopover';
import {
  useSliceActions,
  useSliceSelector,
} from '@/components/SliceProvider/SliceProvider';
import ConfirmModal from '@/modals/ConfirmModal/ConfirmModal';
import FormModal from '@/modals/FormModal/FormModal';
import { ModalButtonIconSizeType } from '@/modals/types';
import KanbanBoardTaskForm from '../KanbanBoardTaskForm/KanbanBoardTaskForm';

/**
 * Kanban Board Task Menu Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IKanbanBoardTaskMenuProps
 * @prop {boolean} canEdit - task can be edited
 * @prop {number} colIndex - column index of this task
 * @prop {number} taskIndex - index of task
 * @prop {IEditKanbanBoardTaskPayload} currentData - current task data
 * @prop {ModalButtonIconSizeType} iconSize - button icon size
 */
interface IKanbanBoardTaskMenuProps {
  canEdit?: boolean;
  colIndex: number;
  taskIndex: number;
  currentData: IEditKanbanBoardTaskPayload;
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
  const { canEdit, colIndex, taskIndex, currentData, iconSize } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { data: kanbanData } = useSliceSelector() as IKanbanBoardState;
  const { deleteTask } = useSliceActions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * Callback listener for opening task menu popover
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @param {MouseEvent<HTMLButtonElement>} event - object change event
   */
  const handleOpenMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  /**
   * Callback listener for closing task menu popover
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   */
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  /**
   * Callback listener for deleting task
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @param {number} deleteColIndex - column of task to be deleted
   * @param {number} deleteTaskIndex - index of task to be deleted
   * @param {any} closeModal - callback for handling closing of modal
   */
  const handleDelete = (
    deleteColIndex: number,
    deleteTaskIndex: number,
    closeModal: () => void
  ) => {
    dispatch(
      // @ts-ignore
      deleteTask({ colIndex: deleteColIndex, taskIndex: deleteTaskIndex })
    );
    closeModal();
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
        <FormModal
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
            columns={kanbanData.columns}
            currentData={currentData}
            closeModal={handleCloseMenu}
          />
        </FormModal>
        {canEdit && (
          <ConfirmModal
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
            actionFunc={(closeModal) =>
              handleDelete(colIndex, taskIndex, closeModal)
            }
          />
        )}
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
