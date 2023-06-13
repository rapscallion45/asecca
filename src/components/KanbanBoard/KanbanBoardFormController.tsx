import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IAddKanbanBoardPayload, IEditKanbanBoardPayload } from '@/redux/types';
import { AppState } from '@/redux/store';
import { addBoard, editBoard } from '@/redux/slices/kanbanSlice';
import { IKanbanBoard, IKanbanBoardColumn } from '@/lib/api/api-types';

/**
 * Kanban board form controller hook, used for board form logic,
 * input handling and form submission
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 * @memberof KanbanBoardForm
 *
 * @function
 * @param {boolean} isEditMode - is form creating a new board or editing existing task
 * @param {IKanbanBoard} currentData - board data
 * @param {Array<IKanbanBoardColumn>} newColumns - form column state data
 * @param {any} closeModal - callback for closing the board form modal
 */
const useKanbanBoardFormController = (
  isEditMode: boolean,
  newColumns: Array<IKanbanBoardColumn>,
  currentData?: IKanbanBoard,
  closeModal?: () => void
) => {
  const dispatch = useDispatch();
  const { saving } = useSelector((state: AppState) => state.kanban);

  /**
   * Yup input validation configuration for board form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @constant
   */
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Board name is required')
      .max(60, 'Board name must not exceed 60 characters'),
  });

  /**
   * Checks whether user entries for columns are in the correct format
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.4
   *
   * @method
   * @returns {boolean} - whether user entry is validated
   */
  const validate = () =>
    !newColumns.some((newColumn: IKanbanBoardColumn) => !newColumn.name.trim());

  /**
   * Data submission handler for board form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @method
   * @param {IEditKanbanBoardPayload} payload - data to be submitted
   */
  const handleSubmit = (payload: IEditKanbanBoardPayload) => {
    if (!validate()) return;
    if (isEditMode) {
      dispatch(editBoard(payload as IEditKanbanBoardPayload));
      if (closeModal) closeModal();
    } else {
      dispatch(addBoard(payload as IAddKanbanBoardPayload));
      if (closeModal) closeModal();
    }
  };

  /**
   * Formik configuration for board form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @constant
   */
  const formik = useFormik({
    initialValues: {
      name: currentData?.name || 'New Board',
      newColumns: newColumns || [],
    },
    validationSchema,
    onSubmit: (payload: IEditKanbanBoardPayload) => {
      handleSubmit({ name: payload.name, newColumns });
    },
  });

  return { saving, formik };
};
export default useKanbanBoardFormController;
