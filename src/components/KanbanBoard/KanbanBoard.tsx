import { FC } from 'react';
import { Box, Skeleton, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import Column from '@/components/KanbanBoard/KanbanBoardColumn/KanbanBoardColumn';
import { IKanbanBoard, IKanbanBoardColumn } from '@/lib/api/api-types';
import { IKanbanBoardState } from '@/redux/types';

/**
 * Kanban Board Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 *
 * @typedef IKanbanBoardProps
 * @prop {IKanbanBoard} currentData - passed board data
 * @prop {Partial<IKanbanBoardState>} stateData - board loading, error and edited state
 */
interface IKanbanBoardProps {
  currentData: IKanbanBoard;
  stateData: Partial<IKanbanBoardState>;
}

/**
 * Kanban Board
 *
 * Presents columns and task data for passed kanban board
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 *
 * @component
 * @returns {FC} - Kanban Board interface functional component
 */
const KanbanBoard: FC<IKanbanBoardProps> = (props) => {
  const { currentData, stateData } = props;
  //   const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  /**
   * Callback handler for cancelling changes to board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @method
   */
  const handleCancel = () => {};

  /**
   * Callback handler for saving changes to board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @method
   */
  const handleSave = () => {};

  /**
   * Helper component for rendering column skeleton whilst loading board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
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
    <>
      {currentData.columns.length > 0 ? (
        <Box display="flex" flexDirection="row" sx={{ pt: 2, pb: 1 }}>
          {!stateData.loading && !stateData.error ? (
            <>
              {currentData.columns.map((col: IKanbanBoardColumn, index) => (
                <Column key={col.id} colIndex={index} />
              ))}
              {/* <Box
                onClick={() => {
                  setIsBoardModalOpen(true);
                }}
                className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
              >
                + New Column
              </Box> */}
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
          <KanbanBoardEmpty type="edit" currentData={currentData} />
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
          disabled={stateData.saving || stateData.loading || !stateData.edited}
          sx={{ backgroundColor: 'common.white' }}
        >
          Reset Board
        </Button>
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={handleSave}
          disabled={stateData.saving || stateData.loading || !stateData.edited}
          loading={stateData.saving}
          sx={{ ml: 2 }}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
};

export default KanbanBoard;
