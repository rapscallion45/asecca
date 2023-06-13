import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '@/modals/FormModal/FormModal';
import KanbanBoardForm from '../KanbanBoardForm';

/**
 * Kanban Board Empty Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardEmptyProps
 * @prop {string} type - add or edit type to show whether board has content
 */
interface IKanbanBoardEmptyProps {
  type: string;
}

/**
 * Kanban Board Empty
 *
 * Kanban board empty interface for when no Kanban board data is loaded
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IEmptyBoardProps} props - component props
 * @returns {FC} - empty board functional component
 */
const KanbanBoardEmpty: FC<IKanbanBoardEmptyProps> = (props) => {
  const { type } = props;

  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <Typography variant="h4">
        {type === 'edit'
          ? 'This board is empty. Create a new column to get started.'
          : 'There are no Kanban boards currently available. Create a new board to get started...'}
      </Typography>
      <Box
        display="flex"
        justifyContent="start"
        sx={{ flexGrow: 1, mr: 1, mt: 2 }}
      >
        <FormModal
          triggerBtn={{
            type: 'normal',
            // @ts-ignore
            icon: AddIcon,
            text: 'Add New Board',
            color: 'secondary',
          }}
          title="Add New Board"
        >
          <KanbanBoardForm isEditMode={type === 'edit'} />
        </FormModal>
      </Box>
    </div>
  );
};

export default KanbanBoardEmpty;
