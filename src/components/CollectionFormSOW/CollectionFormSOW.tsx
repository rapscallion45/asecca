import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  useMediaQuery,
  Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import { downloadByCollectionId } from '@/redux/slices/collectionFormSOWSlice';

/**
 * Collection Form SOW Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 *
 * @typedef ICollectionFormSOWProps
 * @prop {string} collectionId - ID string of Collection for data API call
 */
interface ICollectionFormSOWProps {
  collectionId: string;
}

/**
 * Collection Form SOW
 *
 * Presents the Collection Form SOW PDF file to the user, populated with data
 * fetched from API: /api/collection/sow/preview
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 *
 * @component
 * @param {ICollectionFormSOWProps} props - component props
 * @returns {FC} - collection form sow functional component
 */
const CollectionFormSOW: FC<ICollectionFormSOWProps> = (props) => {
  const { collectionId } = props;
  const isMobile = useMediaQuery('(min-width:600px)');

  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get collection form SOW data held in redux state */
  const {
    data: SOWData,
    loading,
    error,
    downloading,
    valid,
  } = useSelector((state: AppState) => state.collectionFormSOW);

  /**
   * Handles the downloading of the SOW PDF
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.21
   *
   * @method
   */
  const handleDownload = useCallback((): void => {
    dispatch(downloadByCollectionId({ collectionId }));
  }, [collectionId, dispatch]);

  return (
    <Card>
      <CardHeader title="SOW" />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
          }}
        >
          <Box mb={2}>
            {valid.sow_validity === 'valid - generated' && (
              <iframe
                src={`data:application/pdf;base64,${SOWData.pdf}`}
                title={`SOW PDF Preview - Collection ${collectionId}`}
                width="100%"
                height="500px"
              />
            )}
            {valid.sow_validity === 'valid - not generated' && (
              <Box
                display="flex"
                flexDirection="column"
                py={7}
                alignItems="center"
              >
                <WarningIcon color="warning" fontSize="medium" />
                <Typography variant="body1" mt={2}>
                  No PDF generated for this SOW.
                </Typography>
              </Box>
            )}
            {valid.sow_validity === 'invalid' && (
              <Box
                display="flex"
                flexDirection="column"
                py={7}
                alignItems="center"
              >
                <ErrorIcon color="error" fontSize="medium" />
                <Typography variant="body1" mt={2}>
                  SOW Invalid.
                </Typography>
              </Box>
            )}
          </Box>
          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleDownload}
            disabled={
              downloading ||
              loading ||
              Boolean(error) ||
              valid.sow_validity !== 'valid - generated'
            }
            loading={downloading}
            fullWidth={isMobile}
            sx={{ width: isMobile ? '200px' : '100%' }}
          >
            Download PDF
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionFormSOW;
