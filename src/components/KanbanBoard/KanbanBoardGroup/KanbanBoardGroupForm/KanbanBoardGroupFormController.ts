import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  IAddKanbanBoardGroupPayload,
  IEditKanbanBoardGroupPayload,
  IKanbanBoardState,
} from '@/redux/types';
import { AppDispatch } from '@/redux/store';
import {
  useSliceActions,
  useSliceSelector,
} from '@/components/SliceProvider/SliceProvider';
import { IKanbanBoardColumn } from '@/lib/api/api-types';

/**
 * Kanban board group form controller hook, used for group form logic,
 * input handling and form submission
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 * @memberof KanbanBoardGroupForm
 *
 * @function
 * @param {boolean} isEditMode - is form creating a new group or editing existing
 * @param {Array<IKanbanBoardColumn>} columns - column list for groups's board
 * @param {IEditKanbanBoardGroupPayload} currentData - group data
 * @param {any} closeModal - callback for closing the group form modal
 */
const useKanbanBoardGroupFormController = (
  isEditMode: boolean,
  columns: Array<IKanbanBoardColumn>,
  currentData?: IEditKanbanBoardGroupPayload,
  closeModal?: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { saving } = useSliceSelector() as IKanbanBoardState;
  const { addTask, editTask } = useSliceActions();

  /**
   * Yup input validation configuration for group form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @constant
   */
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Group name is required')
      .max(100, 'Group name must not exceed 100 characters'),
  });

  /**
   * Data submission handler for group form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @param {IEditKanbanBoardGroupPayload} payload - data to be submitted
   */
  const handleSubmit = (payload: IEditKanbanBoardGroupPayload) => {
    if (isEditMode) {
      // @ts-ignore
      dispatch(editTask(payload as IEditKanbanBoardGroupPayload));
      if (closeModal) closeModal();
    } else {
      // @ts-ignore
      dispatch(addTask(payload as IAddKanbanBoardGroupPayload));
      if (closeModal) closeModal();
    }
  };

  /**
   * Formik configuration for group form
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @constant
   */
  const formik = useFormik({
    initialValues: {
      name: currentData?.name || 'New Group',
      status: currentData?.status || '',
      groupIndex: currentData?.groupIndex || 0,
      newColIndex: columns.findIndex(
        (col: IKanbanBoardColumn) => col.name === currentData?.status
      ),
      prevColIndex: columns.findIndex(
        (col: IKanbanBoardColumn) => col.name === currentData?.status
      ),
    },
    validationSchema,
    onSubmit: (payload: IEditKanbanBoardGroupPayload) => {
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
export default useKanbanBoardGroupFormController;
