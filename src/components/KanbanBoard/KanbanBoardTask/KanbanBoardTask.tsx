import { FC, useCallback, DragEvent } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { IKanbanBoardColumn, IKanbanBoardTask } from '@/lib/api/api-types';
import { IEditKanbanBoardTaskPayload, IKanbanBoardState } from '@/redux/types';
import { useSliceSelector } from '@/components/SliceProvider/SliceProvider';
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
 * @prop {boolean} dragEnabled - task drag enabled flag
 */
interface IKanbanBoardTaskProps {
  colIndex: number;
  taskIndex: number;
  dragEnabled?: boolean;
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
  const { colIndex, taskIndex, dragEnabled = false } = props;
  // const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const { data: kanbanData } = useSliceSelector() as IKanbanBoardState;

  /* find this task and subtasks from passed board column and task indicies */
  const task = kanbanData.columns
    .find((col: IKanbanBoardColumn, index: number) => index === colIndex)
    ?.tasks.find(
      (taskItem: IKanbanBoardTask, index: number) => index === taskIndex
    );

  /* build current data structure for this task */
  const currentData: IEditKanbanBoardTaskPayload = {
    name: task?.name || '',
    status: task?.status || '',
    newColIndex: colIndex,
    taskIndex,
    prevColIndex: colIndex,
  };

  /**
   * Callback listens for drag of task
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {DragEvent} event - object change event
   */
  const handleOnDrag = useCallback(
    (event: DragEvent) => {
      event.dataTransfer.setData(
        'text',
        JSON.stringify({ taskIndex, prevColIndex: colIndex })
      );
    },
    [taskIndex, colIndex]
  );

  return task ? (
    <Card
      draggable={dragEnabled}
      // onClick={() => {
      //   setIsTaskModalOpen(true);
      // }}
      onDragStart={handleOnDrag}
      sx={{ width: 275, mb: 2 }}
    >
      <CardContent sx={{ py: '5px !important' }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
            Task
          </Typography>
          <Box display="flex" justifyContent="end" flexGrow={1}>
            <KanbanBoardTaskMenu
              colIndex={colIndex}
              taskIndex={taskIndex}
              currentData={currentData}
              iconSize="small"
            />
          </Box>
        </Box>
        <Typography variant="body2" component="div" mb={1}>
          {task?.name}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default KanbanBoardTask;
