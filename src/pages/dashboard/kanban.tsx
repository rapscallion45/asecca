import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'next';
import { Box } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import EmptyBoard from '@/components/KanbanBoard/EmptyBoard';
import { AppState } from '@/redux/store';
import { setBoardActive } from '@/redux/slices/kanbanSlice';

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
  const { data: kanbanData } = useSelector((state: AppState) => state.kanban);
  const activeBoard = kanbanData.boards?.find((board) => board.isActive);
  if (!activeBoard && kanbanData.boards?.length > 0)
    dispatch(setBoardActive({ index: 0 }));

  return (
    <ClientOnly>
      <Box my={5}>
        {activeBoard && activeBoard.columns.length > 0 ? (
          //   <>
          //     <Header
          //       setIsBoardModalOpen={useCallback(setIsBoardModalOpen, [])}
          //       isBoardModalOpen={isBoardModalOpen}
          //     />
          //     <Home
          //       setIsBoardModalOpen={useCallback(setIsBoardModalOpen, [])}
          //       isBoardModalOpen={isBoardModalOpen}
          //     />
          //   </>
          <div />
        ) : (
          <EmptyBoard type="add" />
        )}
      </Box>
    </ClientOnly>
  );
};

/** dashboard layout used for Kanban page */
KanbanPage.Layout = DashboardLayout;

export default KanbanPage;
