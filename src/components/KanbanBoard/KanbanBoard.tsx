import { FC } from 'react';
import { Box, Button, Card, CardContent, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import KanbanBoardEmpty from '@/components/KanbanBoard/KanbanBoardEmpty/KanbanBoardEmpty';
import Column from '@/components/KanbanBoard/KanbanBoardColumn/KanbanBoardColumn';
import ScrollDrag from '@/components/ScrollDrag/ScrollDrag';
import { IKanbanBoard, IKanbanBoardColumn } from '@/lib/api/api-types';
import FormModal from '@/modals/FormModal/FormModal';
import { IKanbanBoardState } from '@/redux/types';
import KanbanBoardForm from './KanbanBoardForm';
import { useSliceSelector } from '../SliceProvider/SliceProvider';

/**
 * Kanban Board Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 *
 * @typedef IKanbanBoardProps
 * @prop {IKanbanBoard} currentData - passed board data
 * @prop {boolean} canEdit - can edit board data
 */
interface IKanbanBoardProps {
  currentData: IKanbanBoard;
  canEdit?: boolean;
}

/**
 * Kanban Board
 *
 * Presents columns and task data for passed kanban board
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 *
 * @component
 * @returns {FC} - Kanban Board interface functional component
 */
const KanbanBoard: FC<IKanbanBoardProps> = (props) => {
  const { currentData, canEdit = false } = props;
  const theme = useTheme();
  //   const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const { loading, error, saving, edited } =
    useSliceSelector() as IKanbanBoardState;

  /**
   * Callback handler for cancelling changes to board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @method
   */
  const handleCancel = () => {};

  /**
   * Callback handler for saving changes to board
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @method
   */
  const handleSave = () => {};

  return (
    <>
      <ScrollDrag>
        {currentData.columns.length > 0 ? (
          <Box display="flex" flexDirection="row" sx={{ pt: 2, pb: 1 }}>
            {!error && (
              <>
                {currentData.columns.map(
                  (col: IKanbanBoardColumn, index: number) => (
                    <Column key={col.name} colIndex={index} />
                  )
                )}
                {canEdit && (
                  <Card
                    sx={{
                      mt: 7,
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
              </>
            )}
          </Box>
        ) : (
          <Box mt={2}>
            <KanbanBoardEmpty type="edit" currentData={currentData} />
          </Box>
        )}
      </ScrollDrag>
      {canEdit && (
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleCancel}
            disabled={saving || loading || !edited}
            sx={{ backgroundColor: 'common.white' }}
          >
            Reset Board
          </Button>
          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleSave}
            disabled={saving || loading || !edited}
            loading={saving}
            sx={{ ml: 2 }}
          >
            Save
          </LoadingButton>
        </Box>
      )}
    </>
  );
};

export default KanbanBoard;
