import { FC, ReactNode, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { Alert } from '@mui/material';
import { closeNotification } from '../../redux/slices/notificationsSlice';
import { AppDispatch, AppState } from '../../redux/store';
import { INotificationState } from '../../redux/types';

/**
 * Alert Notification Props
 *
 * @since - 0.0.0
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
 * @since - 0.0.0
 *
 * @typedef {HTMLDivElement} Ref - ref to Alert Provider parent div
 */
type Ref = HTMLDivElement;

/**
 * Alert Notification
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 *
 * @param {IAlertNotificationProps} props - component props
 * @param {Ref} ref - reference to the alert provider parent component
 * @returns {ForwardRefExoticComponent} - alert notification component
 */
const AlertNotification = forwardRef<Ref, IAlertNotificationProps>(
  (props, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = props;

    /** close alert callback */
    const handleClose = () => {
      dispatch(closeNotification({ key: id }));
    };

    /** find this alert in state and get variant */
    const { data: notifications } = useSelector(
      (state: AppState) => state.notifications
    );
    const successNotification = notifications.find(
      (notification: INotificationState) => notification.options.key === id
    );

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
 * @since - 0.0.0
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
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 *
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
      /** override all alert variants with our custom component */
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
