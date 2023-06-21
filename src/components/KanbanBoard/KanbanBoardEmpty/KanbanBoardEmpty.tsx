import { FC } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { IKanbanBoard } from '@/lib/api/api-types';
import { useSliceSelector } from '@/components/SliceProvider/SliceProvider';
import { IKanbanBoardState } from '@/redux/types';
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
 * @prop {IKanbanBoard} currentData - passed board data
 * @prop {boolean} canEdit - board is editable
 */
interface IKanbanBoardEmptyProps {
  type: string;
  currentData?: IKanbanBoard;
  canEdit?: boolean;
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
  const { type, currentData, canEdit = false } = props;
  const theme = useTheme();
  const { loading } = useSliceSelector() as IKanbanBoardState;

  /**
   * Helper component for rendering column skeleton whilst loading board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.8
   *
   * @method
   */
  const renderBoardColumnSkeleton = () => (
    <Box mr={2}>
      <Skeleton width={190} height={50} sx={{ borderRadius: '4px', mb: 1 }} />
      <Skeleton
        variant="rectangular"
        width={270}
        height={170}
        sx={{ borderRadius: '4px', mb: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width={270}
        height={170}
        sx={{ borderRadius: '4px', mb: 2 }}
      />
    </Box>
  );

  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      {!loading ? (
        <>
          <Typography variant={type === 'edit' ? 'h6' : 'h4'}>
            {type === 'edit' && canEdit
              ? 'This board is empty. Create a new column to get started.'
              : 'There is no data available for the selected Kanban Board.'}
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
                <KanbanBoardForm isEditMode={false} currentData={currentData} />
              </FormModal>
            ) : (
              <div>
                {canEdit && (
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
                          currentData={currentData}
                          closeModal={() => {}}
                        />
                      </FormModal>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </Box>
        </>
      ) : (
        <Box display="flex" flexDirection="row">
          {renderBoardColumnSkeleton()}
          {renderBoardColumnSkeleton()}
          {renderBoardColumnSkeleton()}
        </Box>
      )}
    </div>
  );
};

export default KanbanBoardEmpty;
