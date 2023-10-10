import {
  FC,
  useState,
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
} from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  MenuItem,
  Fab,
} from '@mui/material';
import FormModalCustomTitle from './FormModalCustomTitle/FormModalCustomTitle';
import HideOnScroll from '../../components/HideOnScroll/HideOnScroll';
import { TriggerButtonTypes } from '../types';

/**
 * Form Modal Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IFormModalCustomTitleProps
 * @prop {string} title - form modal title
 * @prop {TriggerButtonTypes} triggerBtn - type of modal trgger button
 * @prop {ReactNode} children - child nodes
 */
interface IFormModalProps {
  title: string;
  triggerBtn: TriggerButtonTypes;
  children: ReactNode;
}

/**
 * Form Modal
 *
 * Form modal interface wrapper for displaying specific passed form content
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @component
 * @param {IFormModalProps} props - component props
 * @returns {FC} - form modal functional component
 */
const FormModal: FC<IFormModalProps> = (props) => {
  const { triggerBtn, children, title } = props;
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Callback to handle close of form modal
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   */
  const handleModalClose = () => {
    setModalOpen(false);
  };

  /**
   * Callback to handle opening of form modal
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   */
  const handleModalOpen = () => {
    setModalOpen(true);
    if (triggerBtn.type === 'menu' && triggerBtn.closeMenu)
      triggerBtn.closeMenu();
  };

  /**
   * Trigger button helper component
   *
   * Renders the trigger button of the form modal interface
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @returns {ReactElement} - trigger button component
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
            size={triggerBtn.size || 'large'}
            color={triggerBtn.color || 'primary'}
            onClick={handleModalOpen}
          >
            <triggerBtn.icon
              style={{
                marginRight: triggerBtn.variant === 'extended' ? '0.3em' : 0,
              }}
            />
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
        className={triggerBtn.className}
      >
        {triggerBtn.text}
      </Button>
    );
  };

  /**
   * Custom child component renderer, adding passed custom props
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @constant
   */
  const proppedChildren = isValidElement(children)
    ? cloneElement(children as ReactElement<any>, {
        closeModal: handleModalClose,
      })
    : children;

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="xs"
        fullWidth
      >
        <FormModalCustomTitle onClose={handleModalClose}>
          {title}
        </FormModalCustomTitle>
        <DialogContent>{proppedChildren}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormModal;
