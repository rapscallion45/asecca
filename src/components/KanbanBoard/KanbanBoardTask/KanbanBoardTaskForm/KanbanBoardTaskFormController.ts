import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  IAddKanbanBoardTaskPayload,
  IEditKanbanBoardTaskPayload,
  IKanbanBoardState,
} from '@/redux/types';
import { AppDispatch } from '@/redux/store';
import {
  useSliceActions,
  useSliceSelector,
} from '@/components/SliceProvider/SliceProvider';
import { IKanbanBoardColumn } from '@/lib/api/api-types';

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
 * @param {IEditKanbanBoardTaskPayload} editData - task data to be edited
 * @param {any} closeModal - callback for closing the task form modal
 */
const useKanbanBoardTaskFormController = (
  isEditMode: boolean,
  columns: Array<IKanbanBoardColumn>,
  editData?: IEditKanbanBoardTaskPayload,
  closeModal?: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { saving } = useSliceSelector() as IKanbanBoardState;
  const { addTask, editTask } = useSliceActions();

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
  });

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
      name: editData?.name || 'New Task',
      status: editData?.status || '',
      taskIndex: editData?.taskIndex || 0,
      newColIndex: columns.findIndex(
        (col: IKanbanBoardColumn) => col.name === editData?.status
      ),
      prevColIndex: columns.findIndex(
        (col: IKanbanBoardColumn) => col.name === editData?.status
      ),
    },
    validationSchema,
    onSubmit: (payload: IEditKanbanBoardTaskPayload) => {
      handleSubmit({
        ...payload,
        newColIndex: columns
          .map((col: IKanbanBoardColumn) => col.name)
          .indexOf(payload.status),
      });
    },
  });

  return { saving, formik };
};
export default useKanbanBoardTaskFormController;
