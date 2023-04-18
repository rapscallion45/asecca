import { FC, ReactNode, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { Alert } from '@mui/material';
import { closeNotification } from '../../redux/slices/notificationsSlice';
import { AppDispatch, AppState } from '../../redux/store';
import { INotificationState } from '../../redux/types';

interface IAlertNotificationProps {
  id: SnackbarKey;
}
type Ref = HTMLDivElement;

/**
 * Alert Notification
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - notification ID key
 * @param ref - reference to the alert provider parent component
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

interface IAlertProviderProps {
  children?: ReactNode;
}

/**
 * Alert Provider
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - component children
 * @returns {FC} - alert provider HOC
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
