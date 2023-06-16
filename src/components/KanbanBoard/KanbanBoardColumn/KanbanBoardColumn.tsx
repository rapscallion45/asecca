import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { IKanbanBoardTask } from '@/lib/api/api-types';
import { AppState } from '@/redux/store';
import KanbanBoardTask from '../KanbanBoardTask/KanbanBoardTask';
import { IKanbanBoardColumn } from '../types';

/**
 * Kanban Board Column Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardColumnProps
 * @prop {number} colIndex - column index
 * @prop {Array<IKanbanBoardColumn>} columns - column data for board on which this column is on
 */
interface IKanbanBoardColumnProps {
  colIndex: number;
  columns: Array<IKanbanBoardColumn>;
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
  const { colIndex, columns } = props;
  const colColors = ['secondary', 'warning', 'error', 'info', 'primary'];
  const { data: tasks } = useSelector((state: AppState) => state.kanban);

  /* find this column in board state data from passed column index */
  const column = columns.find(
    (col: IKanbanBoardColumn, index: number) => index === colIndex
  );

  /* if no column found in state datam return null */
  return column ? (
    <Box mr={2} sx={{ minWidth: 275 }}>
      <Box display="flex" flexDirection="row" my={2}>
        {/* @ts-ignore */}
        <CircleIcon fontSize="small" color={colColors[colIndex]} />
        <Typography sx={{ ml: 1 }}>
          {column.name} (
          {
            tasks.filter(
              (task: IKanbanBoardTask) => task.status === column.name
            ).length
          }
          )
        </Typography>
      </Box>
      {tasks
        .filter((task: IKanbanBoardTask) => task.status === column.name)
        .map((task: IKanbanBoardTask) => (
          <KanbanBoardTask key={task.id} taskId={task.id} columns={columns} />
        ))}
    </Box>
  ) : null;
};

export default KanbanBoardColumn;
