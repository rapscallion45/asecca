import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { AppState, AppDispatch } from '@/redux/store';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { LoadingButton } from '@mui/lab';
import {
  saveByCollectionId as saveScheduleByCollectionId,
  editSchedule,
  resetSchedule,
} from '@/redux/slices/collectionFormScheduleSlice';

/**
 * Collection Form Schedule Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormScheduleProps
 * @prop {string} collectionId - ID string of Collection for data API call
 */
interface ICollectionFormScheduleProps {
  collectionId: string;
}

/**
 * Collection Form Schedule
 *
 * Presents the Collection Form Schedule form to the user, populated with data
 * fetched from API: /api/collection/schedule/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @param {ICollectionFormScheduleProps} props - component props
 * @returns {FC} - collection form schedule form functional component
 */
const CollectionFormSchedule: FC<ICollectionFormScheduleProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form schedule data held in redux state */
  const {
    data: scheduleData,
    loading,
    error,
    saving,
    edited,
  } = useSelector((state: AppState) => state.collectionFormSchedule);

  /**
   * Handles the editing of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {string} value - form value to be updated
   * @param {string} itemKey - form item key to be updated
   */
  const handleEdit = (value: string, itemKey: string) => {
    dispatch(editSchedule({ itemKey, value }));
  };

  /**
   * Handles the resetting of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   */
  const handleReset = useCallback(() => {
    dispatch(resetSchedule());
  }, [dispatch]);

  /**
   * Handles the saving of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveScheduleByCollectionId({
        data: {
          collection: collectionId,
          preferred_date: scheduleData.preferred_date,
          preferred_time: scheduleData.preferred_time,
          notes: scheduleData.notes,
        },
      })
    );
  }, [collectionId, scheduleData, dispatch]);

  return (
    <Card>
      <CardHeader title="Schedule" />
      <CardContent sx={{ pt: 0 }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { my: 1 },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex">
            <DatePicker
              label="Preferred Date"
              value={dayjs(scheduleData.preferred_date)}
              onChange={(newValue: Dayjs | null) =>
                handleEdit(
                  newValue ? newValue.format('YYYY/MM/DD') : '',
                  'preferred_date'
                )
              }
              sx={{ mr: 2 }}
            />
            <TimeField
              label="Preferred Time"
              value={dayjs(
                `${scheduleData.preferred_date}T${scheduleData.preferred_time}`
              )}
              onChange={(newValue: Dayjs | null) =>
                handleEdit(
                  newValue ? newValue.format('hh:mm') : '',
                  'preferred_time'
                )
              }
              color="secondary"
            />
          </Box>
          <TextField
            id="schedule-notes-multiline"
            label="Notes"
            multiline
            maxRows={4}
            variant="standard"
            value={scheduleData.notes}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleEdit(event.target.value, 'notes');
            }}
            color="secondary"
          />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleReset}
            disabled={saving || loading || !edited || Boolean(error)}
            sx={{ backgroundColor: 'common.white' }}
          >
            Cancel
          </Button>
          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleSave}
            disabled={saving || loading || !edited || Boolean(error)}
            loading={saving}
            sx={{ ml: 2 }}
          >
            Commit
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionFormSchedule;
