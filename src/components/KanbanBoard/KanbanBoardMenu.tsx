import { FC, useState, useCallback, MouseEvent } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
import MenuPopover from '@/components/MenuPopover/MenuPopover';
import ConfirmModal from '@/modals/ConfirmModal/ConfirmModal';
import FormModal from '@/modals/FormModal/FormModal';
import { ModalButtonIconSizeType } from '@/modals/types';
import KanbanBoardForm from './KanbanBoardForm';
import { IKanbanBoard } from './types';

/**
 * Kanban Board Menu Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 *
 * @typedef IKanbanBoardMenuProps
 * @prop {IKanbanBoard} currentData - current board data
 * @prop {ModalButtonIconSizeType} iconSize - button icon size
 */
interface IKanbanBoardMenuProps {
  currentData: IKanbanBoard;
  iconSize?: ModalButtonIconSizeType;
}

/**
 * Kanban Board Menu
 *
 * Kanbaord board menu interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 *
 * @component
 * @param {IKanbanBoardMenuProps} props - component props
 * @returns {FC} - kanban board menu functional component
 */
const KanbanBoardkMenu: FC<IKanbanBoardMenuProps> = (props) => {
  const { currentData, iconSize } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * Callback listener for opening board menu popover
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
   * Callback listener for closing board menu popover
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
   * Callback listener for deleting board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @param {any} closeModal - callback for handling closing of modal
   */
  const handleDelete = useCallback((closeModal: () => void) => {
    closeModal();
  }, []);

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
            text: 'Edit Board Info',
            closeMenu: handleCloseMenu,
          }}
          title="Edit Board Info"
        >
          <KanbanBoardForm
            isEditMode
            currentData={currentData}
            closeModal={handleCloseMenu}
          />
        </FormModal>
        <ConfirmModal
          title="Confirm Delete Board"
          contentText="Are you sure you want to permanently delete this board?"
          actionBtnText="Delete"
          triggerBtn={{
            type: 'menu',
            text: 'Delete Board',
            // @ts-ignore
            icon: DeleteOutlineIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          // processing={deleting}
          actionFunc={(closeModal) => handleDelete(closeModal)}
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
export default KanbanBoardkMenu;
