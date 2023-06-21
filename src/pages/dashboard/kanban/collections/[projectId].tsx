import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
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
 * Collections Project Kanban Page
 *
 * Application Kanban Board interface for displaying a specific Collection project
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @component
 * @returns {NextPageWithLayout} - Collection Project Kanban Board page component
 */
const KanbanCollectionsProjectPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectId } = router.query;
  const {
    data: collectionsBoard,
    error,
    loading,
  } = useSelector((state: AppState) => state.collectionsKanban);

  /* whenever the page query is updated, fetch new kanban data from API */
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchKanbanBoardByProjectId({ projectId }));
  }, [projectId, dispatch]);

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
                      <Typography variant="h4">
                        {error ?? 'Loading board...'}
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
                    {!error && (
                      <>
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
                      </>
                    )}
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
KanbanCollectionsProjectPage.Layout = DashboardLayout;

export default KanbanCollectionsProjectPage;
