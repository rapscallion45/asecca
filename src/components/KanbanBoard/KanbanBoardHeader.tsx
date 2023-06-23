import { FC } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  Divider,
  LinearProgress,
} from '@mui/material';
import KanbanBoardMenu from '@/components/KanbanBoard/KanbanBoardMenu';
import { useSliceSelector } from '@/components/SliceProvider/SliceProvider';
import { IKanbanBoardState } from '@/redux/types';

/**
 * Kanban Board Header Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.11
 *
 * @typedef IKanbanBoardHeaderProps
 * @prop {string} name - Kanban board name
 */
interface IKanbanBoardHeaderProps {
  name: string;
}

/**
 * Kanban Board Header
 *
 * Application Kanban Board Header interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @component
 * @returns {FC} - Kanban Board Header functional component
 */
const KanbanBoardHeader: FC<IKanbanBoardHeaderProps> = (props) => {
  const { name } = props;
  const {
    data: boardData,
    error,
    loading,
  } = useSliceSelector() as IKanbanBoardState;

  return (
    <>
      <Box display="flex" pb={1}>
        <Typography variant="h4">
          {!loading && !error ? (
            name
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
            <Box display="flex" justifyContent="center" alignItems="center">
              <KanbanBoardMenu currentData={boardData} />
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
    </>
  );
};

export default KanbanBoardHeader;
