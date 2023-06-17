import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IKanbanBoard, IKanbanBoardColumn } from './types';

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
    onSubmit: () => {
      if (closeModal && isEditMode) closeModal();
    },
  });

  return { formik };
};
export default useKanbanBoardFormController;
