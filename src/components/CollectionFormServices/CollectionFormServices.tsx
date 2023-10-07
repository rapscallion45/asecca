import { FC, useCallback, ChangeEvent } from 'react';
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
} from '@/redux/slices/collectionFormServicesSlice';
import {
  CollectionFormServicesOnSiteProcessing,
  CollectionFormServicesType,
  ICollectionFormServicesDestruction,
  ICollectionFormServicesRecycling,
  collectionFormServicesTypes,
} from '@/lib/api/api-types';
import {
  getCollectionFormServicesDecommissionRequestValue,
  getCollectionFormServicesTypeValue,
  getCollectionFormServicesTypeEnum,
  getCollectionFormServicesDecommissionRequestEditValue,
  getCollectionFormServicesOwnershipRetentionValue,
  getCollectionFormServicesOwnershipRetentionEditValue,
  getCollectionFormServicesRedeliveryRequestValue,
  getCollectionFormServicesRedeliveryRequestEditValue,
} from '@/utils';

/**
 * Collection Form Services Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesProps
 * @prop {string} collectionId - ID string of Collection for data API call
 */
interface ICollectionFormServicesProps {
  collectionId: string;
}

/**
 * Collection Form Services
 *
 * Presents the Collection Form Services form to the user, populated with data
 * fetched from API: /api/collection/service/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @component
 * @param {ICollectionFormServicesProps} props - component props
 * @returns {FC} - collection form services form functional component
 */
const CollectionFormServices: FC<ICollectionFormServicesProps> = (props) => {
  const { collectionId } = props;

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form services data held in redux state */
  const {
    data: servicesData,
    loading,
    error,
    saving,
    edited,
  } = useSelector((state: AppState) => state.collectionFormServices);

  /**
   * Handles the editing of the form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.14
   *
   * @method
   * @param {string} itemKey - form item key to be updated
   * @param {string | boolean | ICollectionFormServicesRecycling | ICollectionFormServicesDestruction} value - form value to be updated
   */
  const handleEdit = (
    itemKey: string,
    value:
      | string
      | boolean
      | ICollectionFormServicesRecycling
      | ICollectionFormServicesDestruction
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
          on_site_processing: servicesData.on_site_processing,
          service_type: servicesData.service_type,
          site_contact: servicesData.site_contact,
        },
      })
    );
  }, [collectionId, servicesData, dispatch]);

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
                    id="collection-form-services-select"
                    inputProps={{
                      'aria-label': 'collection-form-services-select',
                    }}
                    variant="outlined"
                    color="secondary"
                    value={
                      servicesData.on_site_processing
                        ? ('On-Site' as CollectionFormServicesOnSiteProcessing)
                        : ('Off-Site' as CollectionFormServicesOnSiteProcessing)
                    }
                    onChange={(
                      event: SelectChangeEvent<CollectionFormServicesOnSiteProcessing>
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
                    id="collection-form-services-select"
                    inputProps={{
                      'aria-label': 'collection-form-services-select',
                    }}
                    variant="outlined"
                    color="secondary"
                    value={getCollectionFormServicesTypeEnum(servicesData)}
                    onChange={(
                      event: SelectChangeEvent<CollectionFormServicesType>
                    ) =>
                      handleEdit(
                        'service_type',
                        getCollectionFormServicesTypeValue(event.target.value)
                      )
                    }
                  >
                    {collectionFormServicesTypes.map((type: string) => (
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
                  checked={getCollectionFormServicesDecommissionRequestValue(
                    servicesData
                  )}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) =>
                    handleEdit(
                      'service_type',
                      getCollectionFormServicesDecommissionRequestEditValue(
                        servicesData,
                        checked
                      )
                    )
                  }
                  color="secondary"
                  disabled={
                    getCollectionFormServicesTypeEnum(servicesData) !==
                      'Recycling' &&
                    getCollectionFormServicesTypeEnum(servicesData) !==
                      'Destruction'
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
                  checked={getCollectionFormServicesOwnershipRetentionValue(
                    servicesData
                  )}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) =>
                    handleEdit(
                      'service_type',
                      getCollectionFormServicesOwnershipRetentionEditValue(
                        servicesData,
                        checked
                      )
                    )
                  }
                  color="secondary"
                  disabled={
                    getCollectionFormServicesTypeEnum(servicesData) !==
                    'Recycling'
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
                  checked={getCollectionFormServicesRedeliveryRequestValue(
                    servicesData,
                    getCollectionFormServicesOwnershipRetentionValue(
                      servicesData
                    )
                  )}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) =>
                    handleEdit(
                      'service_type',
                      getCollectionFormServicesRedeliveryRequestEditValue(
                        servicesData,
                        checked
                      )
                    )
                  }
                  color="secondary"
                  disabled={
                    getCollectionFormServicesTypeEnum(servicesData) !==
                    'Recycling'
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
                    id="collection-form-services-select"
                    inputProps={{
                      'aria-label': 'collection-form-services-select',
                    }}
                    variant="outlined"
                    color="secondary"
                    value={servicesData.site_contact}
                    onChange={(
                      event: SelectChangeEvent<typeof servicesData.site_contact>
                    ) => handleEdit('site_contact', event.target.value)}
                  >
                    <MenuItem value="Contact One">Contact One</MenuItem>
                    <MenuItem value="Contact Two">Contact Two</MenuItem>
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

export default CollectionFormServices;
