import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Skeleton, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import Column from '@/components/KanbanBoard/KanbanBoardColumn/KanbanBoardColumn';
import { AppState } from '@/redux/store';
import { IKanbanBoard, IKanbanBoardColumn } from '@/lib/api/api-types';

/**
 * Kanban Board Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 *
 * @typedef IKanbanBoardProps
 * @prop {IKanbanBoard} currentData - passed board data
 */
interface IKanbanBoardProps {
  currentData: IKanbanBoard;
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
  const { currentData } = props;
  //   const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const { loading, error, saving, edited } = useSelector(
    (state: AppState) => state.kanban
  );

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
          {!loading && !error ? (
            <>
              {currentData.columns.map((col: IKanbanBoardColumn, index) => (
                <Column key={col.id} colIndex={index} />
              ))}
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
  );
};

export default KanbanBoard;
