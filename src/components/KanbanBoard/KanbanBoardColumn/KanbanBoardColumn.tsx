import { FC, useCallback, DragEvent } from 'react';
import { Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { IKanbanBoardColumn, IKanbanBoardTask } from '@/lib/api/api-types';
import KanbanBoardTask from '../KanbanBoardTask/KanbanBoardTask';
import { IKanbanBoardColumnOnDropCallback } from '../types';

/**
 * Kanban Board Column Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardColumnProps
 * @prop {number} colIndex - column index
 * @prop {IKanbanBoardColumn} colData - column data
 */
interface IKanbanBoardColumnProps {
  colIndex: number;
  colData: IKanbanBoardColumn;
  onDrop: IKanbanBoardColumnOnDropCallback;
}

/**
 * Kanban Board Column
 *
 * Kanban board column interface for displaying tasks in a certain category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IKanbanBoardColumnProps} props - component props
 * @returns {FC} - data table functional component
 */
const KanbanBoardColumn: FC<IKanbanBoardColumnProps> = (props) => {
  const { colIndex, colData: column, onDrop } = props;
  const colColors = ['secondary', 'warning', 'error', 'info', 'primary'];

  /**
   * Callback listens for drop of task into column after drag
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {DragEvent} event - object change event
   */
  const handleOnDrop = useCallback(
    (event: DragEvent) => {
      const { prevColIndex, taskIndex } = JSON.parse(
        event.dataTransfer.getData('text')
      );

      if (colIndex !== prevColIndex) {
        onDrop(colIndex, prevColIndex, taskIndex);
      }
    },
    [colIndex, onDrop]
  );

  /**
   * Callback listens for task drag over column
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {DragEvent} event - object change event
   */
  const handleOnDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
  }, []);

  /* if no column found in state datam return null */
  return column ? (
    <Box
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      mr={2}
      sx={{ minWidth: 275 }}
    >
      <Box display="flex" flexDirection="row" my={2}>
        {/* @ts-ignore */}
        <CircleIcon fontSize="small" color={colColors[colIndex]} />
        <Typography sx={{ ml: 1 }}>
          {column.name} ({column.tasks.length})
        </Typography>
      </Box>

      {column.tasks.map((task: IKanbanBoardTask, index: number) => (
        <KanbanBoardTask
          key={task.title}
          taskIndex={index}
          colIndex={colIndex}
        />
      ))}
    </Box>
  ) : null;
};

export default KanbanBoardColumn;
