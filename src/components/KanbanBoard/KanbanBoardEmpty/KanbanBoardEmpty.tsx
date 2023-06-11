import React, { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import KanbanBoardModal from '@/modals/KanbanBoard/KanbanBoardModal/KanbanBoardModal';

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
  const [isBoardModalOpen, setIsBoardModalOpen] = useState<boolean>(false);

  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <Typography variant="h4">
        {type === 'edit'
          ? 'This board is empty. Create a new column to get started.'
          : 'There are no Kanban boards currently available. Create a new board to get started...'}
      </Typography>
      <Box my={3}>
        <Button
          onClick={() => {
            setIsBoardModalOpen(true);
          }}
          color="secondary"
          variant="contained"
        >
          {type === 'edit' ? '+ Add New Column' : '+ Add New Board'}
        </Button>
      </Box>
      <KanbanBoardModal
        type={type}
        open={isBoardModalOpen}
        setIsBoardModalOpen={setIsBoardModalOpen}
      />
    </div>
  );
};

export default KanbanBoardEmpty;
