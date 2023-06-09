import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { dragTask } from '@/redux/slices/kanbanSlice';
import { IKanbanBoardColumn, IKanbanBoardTask } from '@/lib/api/api-types';
import { AppState } from '@/redux/store';
import Task from './KanbanBoardTask';

/**
 * Kanban Board Column Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardColumnProps
 * @prop {number} colIndex - column index
 */
interface IKanbanBoardColumnProps {
  colIndex: number;
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
  const { colIndex } = props;
  const dispatch = useDispatch();
  const { data: kanbanData } = useSelector((state: AppState) => state.kanban);
  const colColors = ['secondary', 'warning', 'error', 'info', 'primary'];

  /* find this column in board state data from passed column index */
  const column = kanbanData.boards
    .find((board) => board.isActive === true)
    ?.columns.find(
      (col: IKanbanBoardColumn, index: number) => index === colIndex
    );

  /**
   * Callback listens for drop of task into column after drag
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {any} event - object change event
   */
  const handleOnDrop = (event: any) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      event.dataTransfer.getData('text')
    );

    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  /**
   * Callback listens for task drag over column
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {any} event - object change event
   */
  const handleOnDragOver = (event: any) => {
    event.preventDefault();
  };

  /* if no column found in state datam return null */
  return column ? (
    <Box onDrop={handleOnDrop} onDragOver={handleOnDragOver} mr={2}>
      <Box display="flex" flexDirection="row" my={2}>
        {/* @ts-ignore */}
        <CircleIcon fontSize="small" color={colColors[colIndex]} />
        <Typography sx={{ ml: 1 }}>
          {column.name} ({column.tasks.length})
        </Typography>
      </Box>

      {column.tasks.map((task: IKanbanBoardTask, index: number) => (
        <Task key={task.title} taskIndex={index} colIndex={colIndex} />
      ))}
    </Box>
  ) : null;
};

export default KanbanBoardColumn;
