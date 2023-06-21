import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPageWithLayout } from 'next';
import {
  Box,
  Typography,
  Skeleton,
  Divider,
  LinearProgress,
} from '@mui/material';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import KanbanBoardMenu from '@/components/KanbanBoard/KanbanBoardMenu';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { AppState } from '@/redux/store';
import SliceProvider from '@/components/SliceProvider/SliceProvider';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';

/**
 * Kanban Page
 *
 * Application Kanban Board interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @returns {NextPageWithLayout} - Kanban Board interface page component
 */
const KanbanCollectionsPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const {
    data: collectionsBoard,
    error,
    loading,
  } = useSelector((state: AppState) => state.collectionsKanban);

  /* whenever the page query is updated, fetch new data from API */
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchKanbanBoardByProjectId({ projectId: '66135000002534169' }));
    console.log('Hardcoded fetch to collections kanban!!!');
  }, [dispatch]);

  return (
    <ClientOnly>
      <Box my={5}>
        <SliceProvider slice={collectionsKanbanSlice}>
          {collectionsBoard ? (
            <>
              <Box display="flex" pb={1}>
                <Typography variant="h4">
                  {!loading && !error ? (
                    collectionsBoard?.name || 'Collection'
                  ) : (
                    <Box display="flex">
                      <Typography mr={1} variant="h4">
                        Loading board...
                      </Typography>
                    </Box>
                  )}
                </Typography>
                {!loading && !error ? (
                  <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <KanbanBoardMenu currentData={collectionsBoard} />
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                    <Skeleton
                      variant="rectangular"
                      width={140}
                      height={40}
                      sx={{ borderRadius: '4px' }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={70}
                      height={40}
                      sx={{ borderRadius: '4px', ml: 2 }}
                    />
                  </Box>
                )}
              </Box>
              {!loading ? (
                <Divider />
              ) : (
                <LinearProgress color="secondary" sx={{ borderRadius: 1 }} />
              )}
              <KanbanBoard currentData={collectionsBoard} />
            </>
          ) : (
            <KanbanBoardEmpty type="add" />
          )}
        </SliceProvider>
      </Box>
    </ClientOnly>
  );
};

/** dashboard layout used for Kanban Collections page */
KanbanCollectionsPage.Layout = DashboardLayout;

export default KanbanCollectionsPage;
