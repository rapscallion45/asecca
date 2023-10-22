import { FC, useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Stack,
  Skeleton,
  Grid,
  Typography,
  Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addNotification } from '@/redux/slices/notificationsSlice';
import {
  IAssetCategoryFacilitiesDataPayload,
  INewAssetCategoryData,
  INewAssetCategoryDataPayload,
} from '@/lib/api/api-types';
import assetCategoryService from '@/services/assetCategory/assetCategory';
import assetCategoryFacilitiesDataMock from '../../../__mocks__/assetCategoryFacilitiesDataMock';

/**
 * New Asset Category Modal Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 *
 * @typedef INewAssetCategoryModalProps
 * @prop {any} closeModal - on close modal callback handler
 */
interface INewAssetCategoryModalProps {
  closeModal?: (fetchNewTypes: boolean) => void;
}

/**
 * New Asset Category Modal
 *
 * Presents the Collection Form New Asset modal to the user, populated with data
 * fetched from API: /api/collection/asset_category/api/facilities
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 *
 * @component
 * @param {INewAssetCategoryModalProps} props - component props
 * @returns {FC} - collection form new asset modal functional component
 */
const NewAssetCategoryModal: FC<INewAssetCategoryModalProps> = (props) => {
  const { closeModal } = props;
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Local state data for asset category facilities loading flag
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @constant
   */
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Local state data for new asset category saving flag
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @constant
   */
  const [saving, setSaving] = useState<boolean>(false);

  /**
   * Local state data for new asset category facilities list
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @constant
   */
  const [facilities, setFacilities] =
    useState<IAssetCategoryFacilitiesDataPayload>(
      assetCategoryFacilitiesDataMock
    );

  /**
   * Local state data for creation of the new asset category
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @constant
   */
  const [newAssetData, setNewAssetData] = useState<INewAssetCategoryData>({
    name: '',
    co2: 0,
    data_bearing: false,
    removable_storage: false,
    serialized: false,
    compatible_facilities: assetCategoryFacilitiesDataMock,
  });

  /* on first load, fetch the asset category facility types */
  useEffect(() => {
    /**
     * Handles the fetching of the asset category facilities data
     *
     * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
     * @since 0.0.16
     *
     * @method
     */
    const fetchFacilities = async () => {
      /* indicate loading in progress */
      setLoading(true);

      /* call API */
      const res = await assetCategoryService.getAssetCategoryFacilities();

      /* clear loading in progress flag */
      setLoading(false);

      /* add a notification and clear local state if bad response from server */
      if (res.status !== 200) {
        dispatch(
          addNotification({
            message: `Failed to load Asset Category Facilities: ${res.statusText}`,
            variant: 'error',
          })
        );
        // setFacilities([]);
        return;
      }

      /* good response, set facilitiy state data */
      const data: IAssetCategoryFacilitiesDataPayload = await res.json();
      setFacilities(data);
    };

    fetchFacilities();
  }, [dispatch]);

  /**
   * Handles the editing of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @method
   * @param {string | boolean} value - form value to be updated
   * @param {string} itemKey - form item key to be updated
   */
  const handleEdit = (
    value: string | Array<string | null> | boolean,
    itemKey: string
  ) => {
    setNewAssetData({ ...newAssetData, [itemKey]: value });
  };

  /**
   * Handles the cancel and closure of the modal
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @method
   */
  const handleCancel = useCallback(() => {
    if (closeModal) closeModal(false);
  }, [closeModal]);

  /**
   * Handles the saving of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @method
   */
  const handleSave = useCallback(async () => {
    /* indicate save in progress */
    setSaving(true);

    /* call API */
    const res = await assetCategoryService.setNewAssetCategory(
      newAssetData as INewAssetCategoryDataPayload
    );

    /* clear save in progress flag */
    setSaving(false);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      dispatch(
        addNotification({
          message: `Failed to save New Asset Category: ${res.statusText}`,
          variant: 'error',
        })
      );
      return;
    }

    /* indicate successful save of New Asset Category */
    dispatch(
      addNotification({
        message: `Successfully saved New Asset Category: ${res.statusText}`,
        variant: 'success',
      })
    );

    /* good response, close the modal as we're done */
    if (closeModal) closeModal(true);
  }, [newAssetData, closeModal, dispatch]);

  /**
   * Handles the saving of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.16
   *
   * @method
   * @param {string | null} facility - facility name
   * @param {boolean} selected - whether user has selected the facilities checkbox
   * @returns {Array<string>} - updated compatible facilities string array
   */
  const getCompatibleFacilitiesUpdateValue = (
    facility: string | null,
    selected: boolean
  ): Array<string | null> =>
    selected
      ? newAssetData.compatible_facilities.concat(facility)
      : newAssetData.compatible_facilities.filter((item) => item !== facility);

  return !loading ? (
    <Box>
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
        <Box display="flex" flexDirection="column">
          <TextField
            id="new-asset-name-input"
            label="Name"
            value={newAssetData.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleEdit(event.target.value, 'name');
            }}
            placeholder="New Asset Category Name..."
          />
          <TextField
            id="new-asset-co2-input"
            label="CO2"
            value={newAssetData.co2}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleEdit(event.target.value, 'co2');
            }}
            placeholder="New Asset Category CO2 value..."
          />
          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="data-bearing-radio-buttons-group-label">
              Data Bearing:
            </FormLabel>
            <RadioGroup
              aria-labelledby="data-bearing-radio-buttons-group-label"
              name="data-bearing-radio-buttons-group"
              value={newAssetData.data_bearing ? 'true' : 'false'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleEdit(event.target.value === 'true', 'data_bearing');
              }}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio color="secondary" />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="removable-storage-radio-buttons-group-label">
              Removable Storage:
            </FormLabel>
            <RadioGroup
              aria-labelledby="removable-storage-radio-buttons-group-label"
              name="removable-storage-radio-buttons-group"
              value={newAssetData.removable_storage ? 'true' : 'false'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleEdit(event.target.value === 'true', 'removable_storage');
              }}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio color="secondary" />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="serialised-radio-buttons-group-label">
              Serialised:
            </FormLabel>
            <RadioGroup
              aria-labelledby="serialised-radio-buttons-group-label"
              name="serialised-radio-buttons-group"
              value={newAssetData.serialized ? 'true' : 'false'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleEdit(event.target.value === 'true', 'serialized');
              }}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio color="secondary" />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
          <Box mt={2}>
            <Typography color="text.secondary" mb={1}>
              Compatible Facilities:
            </Typography>
            {facilities.map((facility: string | null) => {
              if (facility)
                return (
                  <Box key={facility} display="flex">
                    <Grid
                      container
                      rowSpacing={1}
                      justifyContent="left"
                      alignItems="center"
                    >
                      <Grid item xs={6} md={6}>
                        <Typography>{facility}:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={newAssetData.compatible_facilities.some(
                            (item) => item === facility
                          )}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>,
                            checked: boolean
                          ) =>
                            handleEdit(
                              getCompatibleFacilitiesUpdateValue(
                                facility,
                                checked
                              ),
                              'compatible_facilities'
                            )
                          }
                          color="secondary"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                );
              return null;
            })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'right',
        }}
      >
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCancel}
          disabled={saving}
          sx={{ backgroundColor: 'common.white' }}
        >
          Cancel
        </Button>
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={handleSave}
          disabled={saving || Boolean(!newAssetData.name)}
          loading={saving}
          sx={{ ml: 2 }}
        >
          Create
        </LoadingButton>
      </Box>
    </Box>
  ) : (
    <Stack spacing={1}>
      {/* display loading skeleton */}
      <Skeleton variant="rectangular" width={310} height={60} />
      <Skeleton variant="rectangular" width={310} height={60} />
      <Skeleton variant="rectangular" width={210} height={30} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rectangular" width={210} height={30} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rectangular" width={210} height={30} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rectangular" width={210} height={30} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
};

export default NewAssetCategoryModal;
