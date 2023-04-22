import { FC, ReactNode, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { Alert } from '@mui/material';
import { closeNotification } from '../../redux/slices/notificationsSlice';
import { AppDispatch, AppState } from '../../redux/store';
import { INotification } from '../../redux/types';

/**
 * Alert Notification Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IAlertNotificationProps
 * @prop {SnackbarKey} id - ID of the passed alert notification
 */
interface IAlertNotificationProps {
  id: SnackbarKey;
}

/**
 * Alert Notification Ref type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef {HTMLDivElement} Ref - ref to Alert Provider parent div
 */
type Ref = HTMLDivElement;

/**
 * Alert Notification
 *
 * Global application notification display component
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IAlertNotificationProps} props - component props
 * @param {Ref} ref - reference to the alert provider parent component
 * @returns {ForwardRefExoticComponent} - alert notification component
 */
const AlertNotification = forwardRef<Ref, IAlertNotificationProps>(
  (props, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = props;

    /* find this alert in state and get variant */
    const { data: notifications } = useSelector(
      (state: AppState) => state.notifications
    );
    const successNotification = notifications.find(
      (notification: INotification) => notification.options.key === id
    );

    /**
     * Close alert callback
     *
     * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
     * @since 0.0.0
     *
     * @method
     */
    const handleClose = () => {
      dispatch(closeNotification({ key: id }));
    };

    return (
      <Alert
        ref={ref}
        elevation={6}
        variant="filled"
        severity={successNotification?.options.variant}
        onClose={handleClose}
      >
        {successNotification?.message}
      </Alert>
    );
  }
);

/**
 * Alert Provider Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IAlertProviderProps
 * @prop {ReactNode} children - component children nodes
 */
interface IAlertProviderProps {
  children?: ReactNode;
}

/**
 * Alert Provider
 *
 * Global provider for rendering notifications across the application
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IAlertProviderProps} props - component props
 * @returns {FC} - alert provider functional component
 */
const AlertProvider: FC<IAlertProviderProps> = (props) => {
  const { children = null } = props;

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      /* override all alert variants with our custom component */
      Components={{
        success: AlertNotification,
        error: AlertNotification,
        info: AlertNotification,
        warning: AlertNotification,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AlertProvider;
