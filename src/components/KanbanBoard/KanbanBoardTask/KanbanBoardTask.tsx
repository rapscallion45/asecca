import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  IKanbanBoard,
  IKanbanBoardColumn,
  IKanbanBoardTask,
} from '@/lib/api/api-types';
import { AppState } from '@/redux/store';
import { IAddKanbanBoardTaskPayload } from '@/redux/types';
import KanbanBoardTaskMenu from './KanbanBoardTaskMenu/KanbanBoardTaskMenu';
// import TaskModal from "../modals/TaskModal";

/**
 * Kanban Board Task Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardTaskProps
 * @prop {number} colIndex - column index that task is in
 * @prop {number} taskIndex - index of task
 */
interface IKanbanBoardTaskProps {
  colIndex: number;
  taskIndex: number;
}

/**
 * Kanban Board Task
 *
 * Kanban board task interface for displaying task overview from board column
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IKanbanBoardTaskProps} props - component props
 * @returns {FC} - data table functional component
 */
const KanbanBoardTask: FC<IKanbanBoardTaskProps> = (props) => {
  const { colIndex, taskIndex } = props;
  // const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const { data: kanbanData } = useSelector((state: AppState) => state.kanban);

  /* find this task and subtasks from passed board column and task indicies */
  const task = kanbanData.boards
    ?.find((board: IKanbanBoard) => board.isActive === true)
    ?.columns.find(
      (col: IKanbanBoardColumn, index: number) => index === colIndex
    )
    ?.tasks.find(
      (taskItem: IKanbanBoardTask, index: number) => index === taskIndex
    );
  const subtasks = task?.subtasks;

  /* build current data structure for this task */
  const currentData: IAddKanbanBoardTaskPayload = {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status,
    subtasks: subtasks || [],
    newColIndex: colIndex,
  };

  /* calculate completed subtask number for this task */
  let completed = 0;
  subtasks?.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed += 1;
    }
  });

  /**
   * Callback listens for drag of task
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {any} event - object change event
   */
  const handleOnDrag = (event: any) => {
    event.dataTransfer.setData(
      'text',
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return task ? (
    <Card
      draggable
      // onClick={() => {
      //   setIsTaskModalOpen(true);
      // }}
      onDragStart={handleOnDrag}
      sx={{ width: 275, mb: 2 }}
    >
      <CardContent>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Task
          </Typography>
          <Box display="flex" justifyContent="end" flexGrow={1}>
            <KanbanBoardTaskMenu
              colIndex={colIndex}
              taskIndex={taskIndex}
              currentData={currentData}
            />
          </Box>
        </Box>
        <Typography variant="h5" component="div" mb={1}>
          {task?.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {completed} of {subtasks?.length} tasks complete
        </Typography>
        <Typography variant="body2">{task?.description}</Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default KanbanBoardTask;
