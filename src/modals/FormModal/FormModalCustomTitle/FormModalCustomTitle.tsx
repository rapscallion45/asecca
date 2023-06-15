import { FC, ReactNode } from 'react';
import { IconButton, Box } from '@mui/material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Form Modal Custom Title Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @typedef IFormModalCustomTitleProps
 * @prop {ReactNode} children - child nodes
 * @prop {any} onClose - modal on close callback
 */
interface IFormModalCustomTitleProps {
  children: ReactNode;
  onClose: () => void;
}

/**
 * Form Modal Custom Title
 *
 * Form modal custom title interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 *
 * @component
 * @param {IFormModalCustomTitleProps} props - component props
 * @returns {FC} - form modal custom title functional component
 */
const FormModalCustomTitle: FC<IFormModalCustomTitleProps> = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle {...other}>
      <Box display="flex" alignItems="center">
        {children}
        <Box display="flex" justifyContent="right" sx={{ flexGrow: 1 }}>
          {onClose && (
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </MuiDialogTitle>
  );
};

export default FormModalCustomTitle;
