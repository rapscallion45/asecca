import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPageWithLayout } from 'next';
import { Box, Divider, LinearProgress } from '@mui/material';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import KanbanBoardHeader from '@/components/KanbanBoard/KanbanBoardHeader';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { AppDispatch, AppState } from '@/redux/store';
import SliceProvider from '@/components/SliceProvider/SliceProvider';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';

/**
 * Collection Kanban Page
 *
 * Application Collection Kanban Board interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @returns {NextPageWithLayout} - Collection Kanban Board interface page component
 */
const CollectionsKanbanPage: NextPageWithLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: collectionsBoard, loading } = useSelector(
    (state: AppState) => state.collectionsKanban
  );

  /* whenever the page query is updated, fetch new data from API */
  useEffect(() => {
    dispatch(fetchKanbanBoardByProjectId({ projectId: null }));
  }, [dispatch]);

  return (
    <ClientOnly>
      <Box my={5}>
        <SliceProvider slice={collectionsKanbanSlice}>
          {collectionsBoard ? (
            <>
              <KanbanBoardHeader />
              {!loading ? (
                <Divider />
              ) : (
                <LinearProgress color="secondary" sx={{ borderRadius: 1 }} />
              )}
              <KanbanBoard currentData={collectionsBoard} hideTasks />
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
CollectionsKanbanPage.Layout = DashboardLayout;

export default CollectionsKanbanPage;
