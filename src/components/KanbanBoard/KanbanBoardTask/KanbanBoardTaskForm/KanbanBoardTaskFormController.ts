import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  IAddKanbanBoardTaskPayload,
  IEditKanbanBoardTaskPayload,
} from '@/redux/types';
import { AppState } from '@/redux/store';
import { addTask, editTask } from '@/redux/slices/kanbanSlice';
import { IKanbanBoardColumn, IKanbanBoardSubtask } from '@/lib/api/api-types';

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
 * @param {Array<IKanbanBoardSubtask>} newSubtasks - current edited subtask list
 * @param {IEditKanbanBoardTaskPayload} currentData - task data
 * @param {any} closeModal - callback for closing the task form modal
 */
const useKanbanBoardTaskFormController = (
  isEditMode: boolean,
  columns: Array<IKanbanBoardColumn>,
  newSubtasks: Array<IKanbanBoardSubtask>,
  currentData?: IEditKanbanBoardTaskPayload,
  closeModal?: () => void
) => {
  const dispatch = useDispatch();
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
   * Checks whether user entries for subtasks are in the correct format
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.4
   *
   * @method
   * @returns {boolean} - whether user entry is validated
   */
  const validate = () =>
    !newSubtasks.some((subtask: IKanbanBoardSubtask) => !subtask.title.trim());

  /**
   * Data submission handler for task form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.2
   *
   * @method
   * @param {IEditKanbanBoardTaskPayload} payload - data to be submitted
   */
  const handleSubmit = (payload: IEditKanbanBoardTaskPayload) => {
    if (!validate()) return;
    if (isEditMode) {
      dispatch(editTask(payload as IEditKanbanBoardTaskPayload));
      if (closeModal) closeModal();
    } else {
      dispatch(addTask(payload as IAddKanbanBoardTaskPayload));
      if (closeModal) closeModal();
    }
  };

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
      title: currentData?.title || 'New Task',
      description: currentData?.description || 'Enter task description...',
      subtasks: currentData?.subtasks || [],
      status: currentData?.status || 'Todo',
      taskIndex: currentData?.taskIndex || 0,
      newColIndex: currentData?.newColIndex || 0,
      prevColIndex: currentData?.prevColIndex || 0,
    },
    validationSchema,
    onSubmit: (payload: IEditKanbanBoardTaskPayload) => {
      handleSubmit({
        ...payload,
        subtasks: newSubtasks,
        newColIndex: columns
          .map((col: IKanbanBoardColumn) => col.name)
          .indexOf(payload.status),
      });
    },
  });

  return { saving, formik };
};
export default useKanbanBoardTaskFormController;
