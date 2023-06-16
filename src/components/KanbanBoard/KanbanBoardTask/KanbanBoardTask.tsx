import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { IKanbanBoardTask } from '@/lib/api/api-types';
import { AppState } from '@/redux/store';
import { IEditKanbanBoardTaskPayload } from '@/redux/types';
import KanbanBoardTaskMenu from './KanbanBoardTaskMenu/KanbanBoardTaskMenu';
import { IKanbanBoardColumn } from '../types';
// import TaskModal from "../modals/TaskModal";

/**
 * Kanban Board Task Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardTaskProps
 * @prop {string} taskId - ID of task
 * @prop {Array<IKanbanBoardColumn>} columns - columns for board on which task is from
 */
interface IKanbanBoardTaskProps {
  taskId: string;
  columns: Array<IKanbanBoardColumn>;
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
  const { taskId, columns } = props;
  // const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const { data: kanbanTaskData } = useSelector(
    (state: AppState) => state.kanban
  );

  /* find this task and subtasks from passed board column and task indicies */
  const task = kanbanTaskData.find(
    (taskItem: IKanbanBoardTask) => taskItem.id === taskId
  );

  /* build current data structure for this task */
  const currentData: IEditKanbanBoardTaskPayload = {
    name: task?.name || '',
    status: task?.status || 'Reported',
    id: taskId,
  };

  return task ? (
    <Card
      // onClick={() => {
      //   setIsTaskModalOpen(true);
      // }}
      sx={{ width: 275, mb: 2 }}
    >
      <CardContent>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Task
          </Typography>
          <Box display="flex" justifyContent="end" flexGrow={1}>
            <KanbanBoardTaskMenu
              taskId={taskId}
              columns={columns}
              currentData={currentData}
            />
          </Box>
        </Box>
        <Typography variant="h5" component="div" mb={1}>
          {task.name}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default KanbanBoardTask;
