import { FC } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { IKanbanBoardColumn, IKanbanBoardGroup } from '@/lib/api/api-types';
import { IEditKanbanBoardGroupPayload, IKanbanBoardState } from '@/redux/types';
import { useSliceSelector } from '@/components/SliceProvider/SliceProvider';
import KanbanBoardGroupMenu from './KanbanBoardGroupMenu/KanbanBoardGroupMenu';

/**
 * Kanban Board Group Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IKanbanBoardGroupProps
 * @prop {number} colIndex - column index that group is in
 * @prop {number} groupIndex - index of group
 */
interface IKanbanBoardGroupProps {
  colIndex: number;
  groupIndex: number;
}

/**
 * Kanban Board Group
 *
 * Kanban board group interface for displaying grouped tasks on board column
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @component
 * @param {IKanbanBoardGroupProps} props - component props
 * @returns {FC} - data table functional component
 */
const KanbanBoardGroup: FC<IKanbanBoardGroupProps> = (props) => {
  const { colIndex, groupIndex } = props;
  const pathname = usePathname();
  const router = useRouter();
  const { data: kanbanData } = useSliceSelector() as IKanbanBoardState;

  /* find this group from passed board column and group indicies */
  const group = kanbanData.columns
    .find((col: IKanbanBoardColumn, index: number) => index === colIndex)
    ?.groups?.find(
      (groupItem: IKanbanBoardGroup, index: number) => index === groupIndex
    );

  /* build current data structure for this group */
  const currentData: IEditKanbanBoardGroupPayload = {
    name: group?.name || '',
    status: group?.status || '',
    newColIndex: colIndex,
    groupIndex,
    prevColIndex: colIndex,
  };

  /**
   * Callback to handle click on group item to navigate to specific
   * project kanban board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   */
  const handleClick = () => {
    router.push(`${pathname}/${group?.id}`);
  };

  return group ? (
    <Card sx={{ width: 275, mb: 1 }}>
      <CardContent sx={{ pt: 1, pb: '2px !important', minHeight: 100 }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
            Project
          </Typography>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            flexGrow={1}
          >
            <Typography
              sx={{ fontSize: 11 }}
              color="text.secondary"
              gutterBottom
            >
              {kanbanData.name}s - {group.total_tasks}
            </Typography>
            <KanbanBoardGroupMenu
              colIndex={colIndex}
              groupIndex={groupIndex}
              currentData={currentData}
              iconSize="small"
            />
          </Box>
        </Box>
        <Typography
          onClick={handleClick}
          variant="body1"
          component="div"
          sx={{ cursor: 'pointer' }}
        >
          {group?.name}
        </Typography>
        <Typography
          onClick={handleClick}
          sx={{ fontSize: 9, cursor: 'pointer' }}
          color="text.secondary"
          gutterBottom
        >
          ID - {group.id}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default KanbanBoardGroup;
