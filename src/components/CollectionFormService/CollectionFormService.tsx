import { FC, useCallback, ChangeEvent, InputHTMLAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  Grid,
  Typography,
  Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  saveByCollectionId as saveServicesByCollectionId,
  editServices,
  resetServices,
} from '@/redux/slices/collectionFormServiceSlice';
import {
  CollectionFormServiceOnSiteProcessing,
  CollectionFormServiceType,
  ICollectionFormServiceDestruction,
  ICollectionFormServiceRecycling,
  collectionFormServiceTypes,
} from '@/lib/api/api-types';
import {
  getCollectionFormServiceDecommissionRequestValue,
  getCollectionFormServiceTypeValue,
  getCollectionFormServiceTypeEnum,
  getCollectionFormServiceDecommissionRequestEditValue,
  getCollectionFormServiceOwnershipRetentionValue,
  getCollectionFormServiceOwnershipRetentionEditValue,
  getCollectionFormServiceRedeliveryRequestValue,
  getCollectionFormServiceRedeliveryRequestEditValue,
} from '@/utils';

/**
 * Collection Form Service Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServiceProps
 * @prop {string} collectionId - ID string of Collection for data API call
 */
interface ICollectionFormServiceProps {
  collectionId: string;
}

/**
 * Collection Form Service
 *
 * Presents the Collection Form Service form to the user, populated with data
 * fetched from API: /api/collection/service/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @component
 * @param {ICollectionFormServiceProps} props - component props
 * @returns {FC} - collection form service form functional component
 */
const CollectionFormService: FC<ICollectionFormServiceProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form service data held in redux state */
  const {
    data: serviceData,
    loading,
    error,
    saving,
    edited,
    contacts,
  } = useSelector((state: AppState) => state.collectionFormService);

  /**
   * Handles the editing of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.14
   *
   * @method
   * @param {string} itemKey - form item key to be updated
   * @param {string | boolean | ICollectionFormServiceRecycling | ICollectionFormServiceDestruction} value - form value to be updated
   */
  const handleEdit = (
    itemKey: string,
    value:
      | string
      | boolean
      | ICollectionFormServiceRecycling
      | ICollectionFormServiceDestruction
  ) => {
    dispatch(editServices({ itemKey, value }));
  };

  /**
   * Handles the resetting of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.14
   *
   * @method
   */
  const handleReset = useCallback(() => {
    dispatch(resetServices());
  }, [dispatch]);

  /**
   * Handles the saving of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.14
   *
   * @method
   */
  const handleSave = useCallback(() => {
    dispatch(
      saveServicesByCollectionId({
        data: {
          collection: collectionId,
          on_site_processing: serviceData.on_site_processing,
          service_type: serviceData.service_type,
          site_contact: serviceData.site_contact,
        },
      })
    );
  }, [collectionId, serviceData, dispatch]);

  return (
    <Card>
      <CardHeader title="Services" />
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
          <Box display="flex" mb={2}>
            <Grid
              container
              rowSpacing={1}
              justifyContent="left"
              alignItems="center"
            >
              <Grid item xs={6} md={3}>
                <Typography>Processing:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" sx={{ minWidth: 130 }}>
                  <Select
                    id="collection-form-service-select"
                    inputProps={{
                      'aria-label': 'collection-form-service-select',
                    }}
                    variant="outlined"
                    color="secondary"
                    value={
                      serviceData.on_site_processing
                        ? ('On-Site' as CollectionFormServiceOnSiteProcessing)
                        : ('Off-Site' as CollectionFormServiceOnSiteProcessing)
                    }
                    onChange={(
                      event: SelectChangeEvent<CollectionFormServiceOnSiteProcessing>
                    ) =>
                      handleEdit(
                        'on_site_processing',
                        event.target.value === 'On-Site'
                      )
                    }
                  >
                    <MenuItem value="On-Site">On-Site</MenuItem>
                    <MenuItem value="Off-Site">Off-Site</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" mb={2}>
            <Grid
              container
              rowSpacing={1}
              justifyContent="left"
              alignItems="center"
            >
              <Grid item xs={6} md={3}>
                <Typography>Service Type:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" sx={{ minWidth: 130 }}>
                  <Select
                    id="collection-form-service-select"
                    inputProps={{
                      'aria-label': 'collection-form-service-select',
                    }}
                    variant="outlined"
                    color="secondary"
                    value={getCollectionFormServiceTypeEnum(serviceData)}
                    onChange={(
                      event: SelectChangeEvent<CollectionFormServiceType>
                    ) =>
                      handleEdit(
                        'service_type',
                        getCollectionFormServiceTypeValue(event.target.value)
                      )
                    }
                  >
                    {collectionFormServiceTypes.map((type: string) => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/([A-Z])/g, ' $&')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" mb={2}>
            <Grid
              container
              rowSpacing={1}
              justifyContent="left"
              alignItems="center"
            >
              <Grid item xs={6} md={6}>
                <Typography>Decomissioning Requested:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Checkbox
                  checked={getCollectionFormServiceDecommissionRequestValue(
                    serviceData
                  )}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) =>
                    handleEdit(
                      'service_type',
                      getCollectionFormServiceDecommissionRequestEditValue(
                        serviceData,
                        checked
                      )
                    )
                  }
                  color="secondary"
                  disabled={
                    getCollectionFormServiceTypeEnum(serviceData) !==
                      'Recycling' &&
                    getCollectionFormServiceTypeEnum(serviceData) !==
                      'Destruction'
                  }
                  inputProps={
                    {
                      'data-testid': 'decomissioning-checkbox',
                    } as InputHTMLAttributes<HTMLInputElement>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" mb={2}>
            <Grid
              container
              rowSpacing={1}
              justifyContent="left"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>Customer Retains Ownership Of Devices:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Checkbox
                  checked={getCollectionFormServiceOwnershipRetentionValue(
                    serviceData
                  )}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) =>
                    handleEdit(
                      'service_type',
                      getCollectionFormServiceOwnershipRetentionEditValue(
                        serviceData,
                        checked
                      )
                    )
                  }
                  color="secondary"
                  disabled={
                    getCollectionFormServiceTypeEnum(serviceData) !==
                    'Recycling'
                  }
                  inputProps={
                    {
                      'data-testid': 'ownership-checkbox',
                    } as InputHTMLAttributes<HTMLInputElement>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" mb={2}>
            <Grid
              container
              rowSpacing={1}
              justifyContent="left"
              alignItems="center"
            >
              <Grid item xs={6} md={6}>
                <Typography>Redelivery Requested:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Checkbox
                  checked={getCollectionFormServiceRedeliveryRequestValue(
                    serviceData,
                    getCollectionFormServiceOwnershipRetentionValue(serviceData)
                  )}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) =>
                    handleEdit(
                      'service_type',
                      getCollectionFormServiceRedeliveryRequestEditValue(
                        serviceData,
                        checked
                      )
                    )
                  }
                  color="secondary"
                  disabled={
                    getCollectionFormServiceTypeEnum(serviceData) !==
                    'Recycling'
                  }
                  inputProps={
                    {
                      'data-testid': 'redelivery-checkbox',
                    } as InputHTMLAttributes<HTMLInputElement>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" mb={2}>
            <Grid
              container
              rowSpacing={1}
              justifyContent="left"
              alignItems="center"
            >
              <Grid item xs={6} md={3}>
                <Typography>Site Contact:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" sx={{ minWidth: 130 }}>
                  <Select
                    id="collection-form-service-select"
                    inputProps={{
                      'aria-label': 'collection-form-service-select',
                    }}
                    variant="outlined"
                    color="secondary"
                    value={serviceData.site_contact}
                    onChange={(
                      event: SelectChangeEvent<typeof serviceData.site_contact>
                    ) => handleEdit('site_contact', event.target.value)}
                  >
                    {contacts.contacts_list.map((contact: string) => (
                      <MenuItem key={contact} value={contact}>
                        {contact}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
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

export default CollectionFormService;
