import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IEditKanbanBoardTaskPayload } from '@/redux/types';
import { AppState } from '@/redux/store';

/**
 * Kanban board task form controller hook, used for task form logic,
 * input handling and form submission
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.2
 * @memberof KanbanBoardTaskForm
 *
 * @function
 * @param {boolean} isEditMode - is form creating a new task or editing existing task
 * @param {Array<IKanbanBoardColumn>} columns - column list for task's board
 * @param {IEditKanbanBoardTaskPayload} currentData - task data
 * @param {any} closeModal - callback for closing the task form modal
 */
const useKanbanBoardTaskFormController = (
  isEditMode: boolean,
  currentData?: IEditKanbanBoardTaskPayload,
  closeModal?: () => void
) => {
  const { saving } = useSelector((state: AppState) => state.kanban);

  /**
   * Yup input validation configuration for task form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @constant
   */
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Task title is required')
      .max(100, 'Task title must not exceed 100 characters'),
    description: Yup.string().required('Task description is required'),
  });

  /**
   * Formik configuration for task form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @constant
   */
  const formik = useFormik({
    initialValues: {
      name: currentData?.name || 'New Task',
      status: currentData?.status || 'Booked',
      id: currentData?.id || '0',
    },
    validationSchema,
    onSubmit: () => {
      if (closeModal && isEditMode) closeModal();
    },
  });

  return { saving, formik };
};
export default useKanbanBoardTaskFormController;
