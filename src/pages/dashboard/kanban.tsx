import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'next';
import { Box, Typography, Skeleton, Divider } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import Column from '@/components/KanbanBoard/KanbanBoardColumn/KanbanBoardColumn';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '@/modals/ConfirmModal/ConfirmModal';
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

  return (
    <ClientOnly>
      <Box my={5}>
        {activeBoard && activeBoard.columns.length > 0 ? (
          <>
            <Box display="flex" flexDirection="column" sx={{ pt: 2, pb: 1 }}>
              <Box display="flex" pb={1}>
                <Typography variant="h4">
                  {!loading && !error ? (
                    activeBoard?.name
                  ) : (
                    <Skeleton width={200} />
                  )}
                </Typography>
                {!loading && !error ? (
                  <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <ConfirmDialog
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
                      {/* <KanbanBoardMenu
                        projectId={projectData?.id}
                        currentName={projectData?.name}
                        currentMembers={projectData?.members.map(
                          (m) => m.member.id
                        )}
                        isAdmin={isAdmin}
                      /> */}
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                    <Skeleton
                      variant="rectangular"
                      width={80}
                      height={35}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="row" sx={{ pt: 2, pb: 1 }}>
              {activeBoard.columns.map((col: IKanbanBoardColumn, index) => (
                <Column key={col.id} colIndex={index} />
              ))}
            </Box>
            {/* <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
          >
            + New Column
          </div> */}
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
