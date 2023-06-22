import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import TaskIcon from '@mui/icons-material/Task';
import {
  IKanbanBoardColumn,
  IKanbanBoardGroup,
  IKanbanBoardTask,
} from '@/lib/api/api-types';
import { useSliceSelector } from '@/components/SliceProvider/SliceProvider';
import FormModal from '@/modals/FormModal/FormModal';
import { IKanbanBoardState } from '@/redux/types';
import KanbanBoardTask from '../KanbanBoardTask/KanbanBoardTask';
import KanbanBoardTaskForm from '../KanbanBoardTask/KanbanBoardTaskForm/KanbanBoardTaskForm';
import KanbanBoardGroup from '../KanbanBoardGroup/KanbanBoardGroup';

/**
 * Kanban Board Column Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardColumnProps
 * @prop {number} colIndex - column index
 * @prop {boolean} dragEnabled - column drag enabled flag
 * @prop {boolean} canEdit - column data is editable
 * @prop {boolean} hideTasks - column will not display tasks
 * @prop {boolean} hideGroups - column will not display groups
 */
interface IKanbanBoardColumnProps {
  colIndex: number;
  dragEnabled?: boolean;
  canEdit?: boolean;
  hideTasks?: boolean;
  hideGroups?: boolean;
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
  const {
    colIndex,
    dragEnabled = false,
    canEdit = false,
    hideTasks = false,
    hideGroups = false,
  } = props;
  const colColors = ['secondary', 'warning', 'error', 'info', 'primary'];
  const { data: kanbanData } = useSliceSelector() as IKanbanBoardState;

  /* find this column in board state data from passed column index */
  const column = kanbanData.columns.find(
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
          {(!hideTasks ? column.tasks.length : 0) +
            (!hideGroups ? column.groups?.length || 0 : 0)}
          )
        </Typography>
      </Box>
      {!hideGroups &&
        column.groups?.map((group: IKanbanBoardGroup, index: number) => (
          <KanbanBoardGroup
            key={group.id}
            groupIndex={index}
            colIndex={colIndex}
          />
        ))}
      {!hideTasks &&
        column.tasks.map((task: IKanbanBoardTask, index: number) => (
          <KanbanBoardTask
            key={task.id}
            taskIndex={index}
            colIndex={colIndex}
            dragEnabled={dragEnabled}
          />
        ))}
      {column.tasks.length <= 0 && (
        <Box py={1}>
          {canEdit ? (
            <FormModal
              triggerBtn={{
                type: 'normal',
                // @ts-ignore
                icon: TaskIcon,
                text: '+ Add Task',
                color: 'secondary',
              }}
              title="Add New Task"
            >
              <KanbanBoardTaskForm
                isEditMode={false}
                columns={kanbanData.columns}
              />
            </FormModal>
          ) : (
            <Box display="flex" justifyContent="left" width="100%" px={5}>
              {column.groups && column.groups?.length <= 0 && (
                <Typography variant="body2">No Tasks.</Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  ) : null;
};

export default KanbanBoardColumn;
