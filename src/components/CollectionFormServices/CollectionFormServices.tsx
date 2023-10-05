import { FC, useCallback } from 'react';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  saveByCollectionId as saveServicesByCollectionId,
  editServices,
  resetServices,
} from '@/redux/slices/collectionFormServicesSlice';

/**
 * Collection Form Services On Site Processing values
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof AseccaAPI
 *
 * @typedef CollectionFormServicesOnSiteProcessing
 */
export type CollectionFormServicesOnSiteProcessing = 'On Site' | 'Off Site';

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
   * @param {string} value - form value to be updated
   * @param {string} itemKey - form item key to be updated
   */
  const handleEdit = (value: string | boolean, itemKey: string) => {
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
          <Box display="flex">
            <FormControl variant="standard" sx={{ minWidth: 230 }}>
              <Select
                id="collection-form-services-select"
                inputProps={{ 'aria-label': 'collection-form-services-select' }}
                variant="outlined"
                value={
                  servicesData.on_site_processing
                    ? ('On-Site' as CollectionFormServicesOnSiteProcessing)
                    : ('Off-Site' as CollectionFormServicesOnSiteProcessing)
                }
                onChange={(
                  event: SelectChangeEvent<CollectionFormServicesOnSiteProcessing>
                ) =>
                  handleEdit(
                    event.target.value === 'On-Site',
                    'on_site_processing'
                  )
                }
              >
                <MenuItem value="On-Site">On-Site</MenuItem>
                <MenuItem value="Off-Site">Off-Site</MenuItem>
              </Select>
            </FormControl>
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
