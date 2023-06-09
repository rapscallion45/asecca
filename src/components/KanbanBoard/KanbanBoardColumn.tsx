import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className="rounded-full w-4 h-4" />
        {column.name} ({column.tasks.length})
      </p>

      {column.tasks.map((task: IKanbanBoardTask, index: number) => (
        <Task key={task.title} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  ) : null;
};

export default KanbanBoardColumn;
