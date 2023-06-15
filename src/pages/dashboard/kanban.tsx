import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'next';
import { Box, Typography, Skeleton, Divider, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import Column from '@/components/KanbanBoard/KanbanBoardColumn/KanbanBoardColumn';
import MHidden from '@/components/@MUI-Extended/MHidden';
import KanbanBoardMenu from '@/components/KanbanBoard/KanbanBoardMenu';
import KanbanBoardTaskForm from '@/components/KanbanBoard/KanbanBoardTask/KanbanBoardTaskForm/KanbanBoardTaskForm';
import ConfirmModal from '@/modals/ConfirmModal/ConfirmModal';
import FormModal from '@/modals/FormModal/FormModal';
import { AppState } from '@/redux/store';
import { deleteBoard, setBoardActive } from '@/redux/slices/kanbanSlice';
import { IKanbanBoardColumn } from '@/lib/api/api-types';

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
const KanbanPage: NextPageWithLayout = () => {
  //   const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    data: kanbanData,
    loading,
    error,
    saving,
    edited,
  } = useSelector((state: AppState) => state.kanban);
  const activeBoard = kanbanData.boards?.find((board) => board.isActive);

  /* check for the active board each time update occurs to Kanban state */
  useEffect(() => {
    if (!activeBoard && kanbanData.boards?.length > 0)
      dispatch(setBoardActive({ index: 0 }));
  }, [activeBoard, kanbanData.boards, dispatch]);

  /**
   * Callback handler for deletion of board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {string} closeModal - closure of modal handler
   */
  const handleDeleteBoard = (closeModal: () => void) => {
    dispatch(deleteBoard());
    dispatch(setBoardActive({ index: 0 }));
    closeModal();
  };

  const handleCancel = () => {};
  const handleSave = () => {};

  /**
   * Helper component for rendering column skeleton whilst loading board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.4
   *
   * @method
   */
  const renderBoardColumnSkeleton = () => (
    <Box mr={2}>
      <Skeleton width={190} height={50} sx={{ borderRadius: '4px', mb: 1 }} />
      <Skeleton
        variant="rectangular"
        width={270}
        height={170}
        sx={{ borderRadius: '4px', mb: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width={270}
        height={170}
        sx={{ borderRadius: '4px', mb: 2 }}
      />
    </Box>
  );

  return (
    <ClientOnly>
      <Box my={5}>
        {activeBoard ? (
          <>
            <Box display="flex" flexDirection="column" sx={{ pt: 2, pb: 1 }}>
              <Box display="flex" pb={1}>
                <Typography variant="h4">
                  {!loading && !error ? (
                    activeBoard?.name
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
                      {activeBoard.columns.length > 0 && (
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
                                columns={activeBoard?.columns}
                              />
                            </FormModal>
                          </Box>
                        </MHidden>
                      )}
                      <ConfirmModal
                        title="Confirm Delete Board"
                        contentText={`Are you sure you want to permanently delete board "${activeBoard?.name}"?`}
                        actionBtnText="Delete"
                        triggerBtn={{
                          type: 'icon',
                          // @ts-ignore
                          icon: DeleteIcon,
                          color: 'inherit',
                        }}
                        // processing={deleting}
                        actionFunc={(closeModal) =>
                          handleDeleteBoard(closeModal)
                        }
                      />
                      <KanbanBoardMenu currentData={activeBoard} />
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
            </Box>
            <Divider />
            {activeBoard.columns.length > 0 ? (
              <Box display="flex" flexDirection="row" sx={{ pt: 2, pb: 1 }}>
                {!loading && !error ? (
                  <>
                    {activeBoard.columns.map(
                      (col: IKanbanBoardColumn, index) => (
                        <Column key={col.id} colIndex={index} />
                      )
                    )}
                  </>
                ) : (
                  <>
                    {renderBoardColumnSkeleton()}
                    {renderBoardColumnSkeleton()}
                    {renderBoardColumnSkeleton()}
                  </>
                )}
              </Box>
            ) : (
              <Box mt={2}>
                <KanbanBoardEmpty type="edit" currentData={activeBoard} />
              </Box>
            )}
            <Box
              sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleCancel}
                disabled={saving || loading || !edited}
                sx={{ backgroundColor: 'common.white' }}
              >
                Reset Board
              </Button>
              <LoadingButton
                color="secondary"
                variant="contained"
                onClick={handleSave}
                disabled={saving || loading || !edited}
                loading={saving}
                sx={{ ml: 2 }}
              >
                Save
              </LoadingButton>
            </Box>
          </>
        ) : (
          <KanbanBoardEmpty type="add" />
        )}
      </Box>
    </ClientOnly>
  );
};

/** dashboard layout used for Kanban page */
KanbanPage.Layout = DashboardLayout;

export default KanbanPage;
