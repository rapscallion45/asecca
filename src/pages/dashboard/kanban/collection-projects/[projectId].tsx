import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { Box, Divider, LinearProgress } from '@mui/material';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { AppDispatch, AppState } from '@/redux/store';
import SliceProvider from '@/components/SliceProvider/SliceProvider';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';
import KanbanBoardHeader from '@/components/KanbanBoard/KanbanBoardHeader';

/**
 * Collection Project Kanban Page
 *
 * Application Kanban Board interface for displaying a specific Collection project
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @component
 * @returns {NextPageWithLayout} - Collection Project Kanban Board page component
 */
const KanbanCollectionProjectPage: NextPageWithLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { projectId } = router.query;
  const { data: collectionsBoard, loading } = useSelector(
    (state: AppState) => state.collectionsKanban
  );

  /* whenever the page query is updated, fetch new kanban data from API */
  useEffect(() => {
    dispatch(fetchKanbanBoardByProjectId({ projectId }));
  }, [projectId, dispatch]);

  return (
    <ClientOnly>
      <Box my={5}>
        <SliceProvider slice={collectionsKanbanSlice}>
          {collectionsBoard ? (
            <>
              <KanbanBoardHeader
                name={collectionsBoard?.name || `Collection - Unnamed`}
              />
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

/** dashboard layout used for Kanban Collection Project page */
KanbanCollectionProjectPage.Layout = DashboardLayout;

export default KanbanCollectionProjectPage;
