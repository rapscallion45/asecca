import { FC, useState, useCallback, MouseEvent } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
// import { AppState } from '@/redux/store';
import { IKanbanBoard } from '@/lib/api/api-types';
import MenuPopover from '@/components/MenuPopover/MenuPopover';
import FormModal from '@/modals/FormModal/FormModal';
import { ModalButtonIconSizeType } from '@/modals/types';
import KanbanBoardForm from './KanbanBoardForm';

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
  // const { deleting } = useSelector((state: AppState) => state.bugs);
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
