import { FC } from 'react';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FormModal from '@/modals/FormModal/FormModal';
import KanbanBoardForm from '../KanbanBoardForm';
import { IKanbanBoard } from '../types';

/**
 * Kanban Board Empty Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardEmptyProps
 * @prop {string} type - add or edit type to show whether board has content
 * @prop {boolean} saving - board data saving flag
 * @prop {IKanbanBoard} currentData - passed board data
 */
interface IKanbanBoardEmptyProps {
  type: string;
  saving: boolean;
  currentData?: IKanbanBoard;
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
  const { type, saving, currentData } = props;
  const theme = useTheme();

  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <Typography variant={type === 'edit' ? 'h6' : 'h4'}>
        {type === 'edit'
          ? 'This board is empty. Create a new column to get started.'
          : 'There are no Kanban boards currently available. Create a new board to get started...'}
      </Typography>
      <Box
        display="flex"
        justifyContent="start"
        sx={{ flexGrow: 1, mr: 1, mt: 2 }}
      >
        {type === 'add' ? (
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
            <KanbanBoardForm
              isEditMode={false}
              saving={saving}
              currentData={currentData}
            />
          </FormModal>
        ) : (
          <Card
            sx={{
              mt: 2,
              minWidth: 275,
              minHeight: 300,
              maxHeight: 500,
              backgroundColor: 'transparent',
              borderColor: theme.palette.text.secondary,
              border: 'solid 1px',
            }}
          >
            <CardContent sx={{ padding: '50% 40px' }}>
              <FormModal
                triggerBtn={{
                  type: 'menu',
                  // @ts-ignore
                  icon: ViewColumnIcon,
                  iconStyle: { marginRight: '10px' },
                  text: '+ Add Column',
                  closeMenu: () => {},
                }}
                title="Add Column"
              >
                <KanbanBoardForm
                  isEditMode
                  saving={saving}
                  currentData={currentData}
                  closeModal={() => {}}
                />
              </FormModal>
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
};

export default KanbanBoardEmpty;
