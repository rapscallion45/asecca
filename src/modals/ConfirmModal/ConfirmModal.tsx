import { FC, useState, useCallback } from 'react';
import {
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Fab,
  CircularProgress,
} from '@mui/material';
import HideOnScroll from '@/components/HideOnScroll/HideOnScroll';
import { TriggerButtonTypes } from '@/modals/types';

/**
 * Confirm Modal Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IConfirmModalProps
 * @prop {string} title - modal title
 * @prop {string} contentText - modal content text
 * @prop {string} actionButtonText - modal action button text
 * @prop {TriggerButtonTypes} triggerBtn - modal trigger button type
 * @prop {boolean} processing - modal action processing
 * @prop {string} actionFunc - modal action function
 */
interface IConfirmModalProps {
  title: string;
  contentText: string;
  actionBtnText: string;
  triggerBtn: TriggerButtonTypes;
  processing: boolean;
  actionFunc: (closeModal: () => void) => void;
}

/**
 * Confirm Modal
 *
 * Global application confirmation modal interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IAddEditBoardModalProps} props - component props
 * @returns {FC} - confirm modal functional component
 */
const ConfirmModal: FC<IConfirmModalProps> = (props) => {
  const {
    title,
    contentText,
    actionBtnText,
    triggerBtn,
    processing,
    actionFunc,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Callback for handling close of modal
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   */
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  /**
   * Callback for handling open of modal
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   */
  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
    if (triggerBtn.type === 'menu' && triggerBtn.closeMenu)
      triggerBtn.closeMenu();
  }, [triggerBtn]);

  /**
   * Callback for handling modal action trigger
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   */
  const handleConfirmedAction = useCallback(() => {
    actionFunc(handleModalClose);
  }, [actionFunc, handleModalClose]);

  /**
   * Trigger Button
   *
   * Modal trigger button interface
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @component
   * @returns {FC} - trigger button functional component
   */
  const triggerButton = () => {
    if (triggerBtn.type === 'icon') {
      return (
        <IconButton
          color={triggerBtn.color || 'primary'}
          onClick={handleModalOpen}
          size={triggerBtn.size || 'medium'}
          className={triggerBtn.className}
          style={triggerBtn.style}
        >
          <triggerBtn.icon fontSize={triggerBtn.iconSize || 'inherit'} />
        </IconButton>
      );
    }
    if (triggerBtn.type === 'menu') {
      return (
        <MenuItem onClick={handleModalOpen}>
          <triggerBtn.icon style={triggerBtn.iconStyle} />
          {triggerBtn.text}
        </MenuItem>
      );
    }
    if (triggerBtn.type === 'fab') {
      return (
        <HideOnScroll>
          <Fab
            variant={triggerBtn.variant || 'circular'}
            size={triggerBtn.size || 'medium'}
            color={triggerBtn.color || 'primary'}
            onClick={handleModalOpen}
          >
            <triggerBtn.icon />
            {triggerBtn.variant === 'extended' && triggerBtn.text}
          </Fab>
        </HideOnScroll>
      );
    }
    if (triggerBtn.type === 'round') {
      return (
        <Button
          color={triggerBtn.color || 'primary'}
          variant={triggerBtn.variant || 'contained'}
          size={triggerBtn.size || 'medium'}
          onClick={handleModalOpen}
          style={triggerBtn.style}
        >
          <triggerBtn.icon />
        </Button>
      );
    }
    return (
      <Button
        color={triggerBtn.color || 'primary'}
        variant={triggerBtn.variant || 'contained'}
        size={triggerBtn.size || 'medium'}
        startIcon={<triggerBtn.icon />}
        onClick={handleModalOpen}
        style={triggerBtn.style}
      >
        {triggerBtn.text}
      </Button>
    );
  };

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog open={modalOpen} onClose={handleModalOpen}>
        <DialogTitle variant="h6">{title}</DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Typography>{contentText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModalClose}
            color="secondary"
            variant="outlined"
            size="small"
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmedAction}
            color="secondary"
            variant="contained"
            size="small"
            disabled={processing}
          >
            {!processing && actionBtnText}
            {processing && <CircularProgress size={22} color="inherit" />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
