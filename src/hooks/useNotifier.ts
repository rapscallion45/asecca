import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, SnackbarKey } from 'notistack';
import { AppDispatch, AppState } from '@/redux/store';
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
  /** app dispatch shorthand helper */
  const dispatch = useDispatch<AppDispatch>();

  /** global app notification state data */
  const { data: notifications } = useSelector(
    (state: AppState) => state.notifications
  );

  /** snackbar hooks */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /**
   * Store displayed notification ID key helper
   *
   * @author - [Carl Scrivener](https://github.com/rapscallion45)
   * @since - 0.0.0
   */
  const storeDisplayed = (id: SnackbarKey | undefined) => {
    displayed = [...displayed, id];
  };

  /**
   * Remove displayed notification ID key helper
   *
   * @author - [Carl Scrivener](https://github.com/rapscallion45)
   * @since - 0.0.0
   */
  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key: SnackbarKey) => id !== key)];
  };

  /** whenever notifications state changes, update displayed/removed list */
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
