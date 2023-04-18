import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, SnackbarKey } from 'notistack';
import { AppState } from '@/redux/store';
import { removeNotification } from '../redux/slices/notificationsSlice';

/**
 * local copy of currently displayed notification ID keys
 *
 * @since - 0.0.0
 */
let displayed: any = [];

/**
 * Notifier hook for processing currently active notifications held in
 * global app state.
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const useNotifier = () => {
  const dispatch = useDispatch();
  const { data: notifications } = useSelector(
    (state: AppState) => state.notifications
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey | undefined) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key: SnackbarKey) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(({ message, options = {}, dismissed = false }) => {
      if (dismissed) {
        /** dismiss snackbar using notistack */
        closeSnackbar(options.key);
        return;
      }

      /** do nothing if snackbar is already displayed */
      if (displayed.includes(options.key)) return;

      /** display snackbar using notistack */
      enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, myKey) => {
          // @ts-ignore
          if (options.onClose) options.onClose(event, reason, myKey);
        },
        onExited: (event, myKey) => {
          /** remove this snackbar from redux store */
          dispatch(removeNotification({ key: myKey }));
          removeDisplayed(myKey);
        },
      });

      /** keep track of snackbars that we've displayed */
      storeDisplayed(options.key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
