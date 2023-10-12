import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '@/redux/store';
import {
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addNotification } from '@/redux/slices/notificationsSlice';
import {
  IContactData,
  ICollectionFormNewContactSaveDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '@/services/forms/collectionFormService';

/**
 * Collection Form New Contact Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormNewContactProps
 * @prop {string} collectionId - ID string of Collection for data API call
 */
interface ICollectionFormNewContactProps {
  collectionId: string;
}

/**
 * Collection Form New Contact
 *
 * Presents the Collection Form New Asset modal to the user, populated with data
 * fetched from API: /api/collection/asset_category/api/facilities
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @component
 * @param {ICollectionFormNewContactProps} props - component props
 * @returns {FC} - collection form new asset modal functional component
 */
const CollectionFormNewContact: FC<ICollectionFormNewContactProps> = (
  props
) => {
  const { collectionId } = props;
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Local state data for new contact saving flag
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @constant
   */
  const [saving, setSaving] = useState<boolean>(false);

  /**
   * Yup input validation configuration for form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @constant
   */
  const validationSchema = Yup.object().shape({
    name: Yup.object().shape({
      prefix: Yup.string()
        .required('Required')
        .max(6, 'Contact prefix must not exceed 6 characters'),
      first: Yup.string()
        .required('Contact first name is required')
        .max(60, 'Contact first name must not exceed 60 characters'),
      last: Yup.string()
        .required('Contact last name is required')
        .max(60, 'Contact last name must not exceed 60 characters'),
    }),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Contact email is required'),
    mobile: Yup.string().matches(
      /^[0-9+]+$/,
      'Mobile number must only contain digits'
    ),
    landline: Yup.string().matches(
      /^[0-9+]+$/,
      'Landline must only contain digits'
    ),
  });

  /**
   * Data submission handler for form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @method
   * @param {ICollectionFormNewContactSaveDataPayload} payload - data to be submitted
   */
  const handleSubmit = async (
    payload: ICollectionFormNewContactSaveDataPayload
  ) => {
    /* indicate save in progress */
    setSaving(true);

    /* call API */
    const res = await collectionFormService.createNewContact(payload);

    /* clear save in progress flag */
    setSaving(false);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      dispatch(
        addNotification({
          message: `Failed to save New Contact: ${res.statusText}`,
          variant: 'error',
        })
      );
      return;
    }

    /* indicate successful save of New Contact */
    dispatch(
      addNotification({
        message: `Successfully saved New Contact: ${res.statusText}`,
        variant: 'success',
      })
    );
  };

  /**
   * Formik configuration for form data
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.17
   *
   * @constant
   */
  const formik = useFormik<IContactData>({
    initialValues: {
      name: {
        prefix: '',
        first: '',
        last: '',
      },
      email: '',
      job_title: '',
      landline: '',
      mobile: '',
    },
    validationSchema,
    onSubmit: (data: IContactData) => {
      handleSubmit({ collectionId, ...data });
    },
  });

  return (
    <Card>
      <CardHeader title="New Contact" />
      <CardContent sx={{ pt: 0 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <TextField
                id="prefix"
                name="name.prefix"
                type="text"
                label="Prefix"
                value={formik.values.name.prefix}
                onChange={formik.handleChange}
                error={
                  formik.touched.name?.prefix &&
                  Boolean(formik.errors.name?.prefix)
                }
                helperText={
                  formik.touched.name?.prefix && formik.errors.name?.prefix
                }
                placeholder="New Contact Name Prefix..."
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id="first"
                name="name.first"
                type="text"
                label="First Name"
                value={formik.values.name.first}
                onChange={formik.handleChange}
                error={
                  formik.touched.name?.first &&
                  Boolean(formik.errors.name?.first)
                }
                helperText={
                  formik.touched.name?.first && formik.errors.name?.first
                }
                placeholder="New Contact First Name..."
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id="last"
                name="name.last"
                type="text"
                label="Last Name"
                value={formik.values.name.last}
                onChange={formik.handleChange}
                error={
                  formik.touched.name?.last && Boolean(formik.errors.name?.last)
                }
                helperText={
                  formik.touched.name?.last && formik.errors.name?.last
                }
                placeholder="New Contact Last Name..."
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder="New Contact Email..."
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="job_title"
                name="job_title"
                type="text"
                label="Job Title"
                value={formik.values.job_title}
                onChange={formik.handleChange}
                error={
                  formik.touched.job_title && Boolean(formik.errors.job_title)
                }
                helperText={formik.touched.job_title && formik.errors.job_title}
                placeholder="New Contact Job Title..."
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="landline"
                name="landline"
                type="text"
                label="Landline"
                value={formik.values.landline}
                onChange={formik.handleChange}
                error={
                  formik.touched.landline && Boolean(formik.errors.landline)
                }
                helperText={formik.touched.landline && formik.errors.landline}
                placeholder="New Contact Landline..."
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mobile"
                name="mobile"
                type="text"
                label="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                placeholder="New Contact Mobile..."
                fullWidth
                color="secondary"
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <Button
              color="secondary"
              variant="outlined"
              onClick={formik.handleReset}
              disabled={saving}
              sx={{ backgroundColor: 'common.white' }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              color="secondary"
              variant="contained"
              disabled={saving}
              loading={saving}
              sx={{ ml: 2 }}
            >
              Create
            </LoadingButton>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default CollectionFormNewContact;
