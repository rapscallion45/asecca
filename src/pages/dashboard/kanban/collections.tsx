import { useSelector } from 'react-redux';
import { NextPageWithLayout } from 'next';
import { Box, Typography, Skeleton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import MHidden from '@/components/@MUI-Extended/MHidden';
import KanbanBoardMenu from '@/components/KanbanBoard/KanbanBoardMenu';
import KanbanBoardTaskForm from '@/components/KanbanBoard/KanbanBoardTask/KanbanBoardTaskForm/KanbanBoardTaskForm';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import FormModal from '@/modals/FormModal/FormModal';
import { AppState } from '@/redux/store';
import SliceProvider from '@/components/SliceProvider/SliceProvider';
import { collectionsKanbanSlice } from '@/redux/slices/collectionsKanbanSlice';

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
  const {
    data: collectionsBoard,
    loading,
    error,
  } = useSelector((state: AppState) => state.collectionsKanban);

  return (
    <ClientOnly>
      <Box my={5}>
        <SliceProvider slice={collectionsKanbanSlice}>
          {collectionsBoard ? (
            <>
              <Box display="flex" pb={1}>
                <Typography variant="h4">
                  {!loading && !error ? (
                    collectionsBoard?.name
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={300}
                      height={40}
                      sx={{ borderRadius: '4px' }}
                    />
                  )}
                </Typography>
                {!loading && !error ? (
                  <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {collectionsBoard.columns.length > 0 && (
                        <MHidden width="smDown">
                          <Box
                            display="flex"
                            justifyContent="end"
                            sx={{ flexGrow: 1, mr: 1 }}
                          >
                            <FormModal
                              triggerBtn={{
                                type: 'normal',
                                // @ts-ignore
                                icon: AddIcon,
                                text: 'Add Task',
                                color: 'secondary',
                              }}
                              title="Add New Task"
                            >
                              <KanbanBoardTaskForm
                                isEditMode={false}
                                columns={collectionsBoard?.columns}
                              />
                            </FormModal>
                          </Box>
                        </MHidden>
                      )}
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
              <Divider />
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
