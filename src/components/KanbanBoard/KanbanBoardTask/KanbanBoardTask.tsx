import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { IKanbanBoardTask } from '@/lib/api/api-types';
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
 * @prop {boolean} saving - saving state of board
 * @prop {Array<IKanbanBoardColumn>} columns - columns for board on which task is from
 * @prop {IKanbanBoardTask} data - data for this task
 */
interface IKanbanBoardTaskProps {
  taskId: string;
  saving: boolean;
  columns: Array<IKanbanBoardColumn>;
  data: IKanbanBoardTask;
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
  const { taskId, columns, saving, data } = props;
  // const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  /* build current data structure for this task */
  const currentData: IEditKanbanBoardTaskPayload = {
    name: data?.name || '',
    status: data?.status || 'Reported',
    id: taskId,
  };

  return data ? (
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
              saving={saving}
              columns={columns}
              currentData={currentData}
            />
          </Box>
        </Box>
        <Typography variant="h5" component="div" mb={1}>
          {data.name}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default KanbanBoardTask;
