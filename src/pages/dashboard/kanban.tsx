import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPageWithLayout } from 'next';
import { Box, Typography, Skeleton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import MHidden from '@/components/@MUI-Extended/MHidden';
import KanbanBoardMenu from '@/components/KanbanBoard/KanbanBoardMenu';
import KanbanBoardTaskForm from '@/components/KanbanBoard/KanbanBoardTask/KanbanBoardTaskForm/KanbanBoardTaskForm';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ConfirmModal from '@/modals/ConfirmModal/ConfirmModal';
import FormModal from '@/modals/FormModal/FormModal';
import { AppState } from '@/redux/store';
import {
  deleteBoard,
  dragTask,
  setBoardActive,
} from '@/redux/slices/kanbanSlice';
import { IKanbanBoardColumnOnDropCallback } from '@/components/KanbanBoard/types';

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
   * Callback handler for dropping task into new column
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @method
   * @param {number} colIndex  - column index of task
   * @param {number} prevColIndex - previous column index of task
   * @param {number} taskIndex - index of task
   */
  const handleOnDrop: IKanbanBoardColumnOnDropCallback = (
    colIndex: number,
    prevColIndex: number,
    taskIndex: number
  ) => {
    dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
  };

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

  return (
    <ClientOnly>
      <Box my={5}>
        {activeBoard ? (
          <>
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
                      actionFunc={(closeModal) => handleDeleteBoard(closeModal)}
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
            <Divider />
            <KanbanBoard
              currentData={activeBoard}
              stateData={{ loading, saving, error, edited }}
              handleOnDrop={handleOnDrop}
            />
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
