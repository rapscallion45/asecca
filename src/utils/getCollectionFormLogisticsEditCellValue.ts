import lodash from 'lodash';
import {
  ICollectionFormLogisticsDataPayload,
  ICollectionFormLogisticsTypesData,
} from '@/lib/api/api-types';
import {
  DataTableRowCellValue,
  IDataTableColumn,
} from '@/components/DataTable/types';
import { ICollectionFormLogisticsEditLogisticsPayload } from '@/redux/types';

/**
 * Helper function for getting the Collection Form Logistics Edit Cell data
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Utils
 *
 * @param {DataTableRowCellValue} value - edited cell value
 * @param {string} colKey - current column to be processed
 * @param {number} rowIdx - row index of data
 * @param {Array<ICollectionFormLogisticsTypesData>} logisticsTypes - logistics types
 * @param {Array<IDataTableColumn>} colList - column list
 * @returns {DataTableRowCellValue} - resulting value string, null or undefined
 */
const getCollectionFormLogisticsEditCellValue = (
  data: ICollectionFormLogisticsDataPayload,
  value: DataTableRowCellValue,
  colKey: string,
  rowIdx: number,
  logisticsTypes: Array<ICollectionFormLogisticsTypesData>,
  colList: Array<IDataTableColumn>
): ICollectionFormLogisticsEditLogisticsPayload => {
  /* sanity check input */
  if (colKey === '' || !rowIdx) return { value: null, colKey: '', rowIdx: -1 };

  /**
   * Get Value
   *
   * If column is not facilities Logistics Type name, we need to check whether
   * the facility type is checked, and if so, add this to the list of
   * "visiting facilities" held in global state.
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @returns {ICollectionFormLogisticsEditLogisticsPayload} - edit value
   */
  const getValue = (): ICollectionFormLogisticsEditLogisticsPayload => {
    /* if logistics type name col, simply return name string */
    if (colKey === 'logistics_type') return { value, colKey, rowIdx };

    /**
     * not the logistics type name, therefore must be facility column,
     * check compatibility and add to visiting facilities array, if compatible
     */
    if (
      logisticsTypes
        .find(
          (type) => type.logistics_type === data.rows[rowIdx].logistics_type
        )
        ?.compatible_facilities.some(
          (facility) => lodash.snakeCase(facility) === colKey
        )
    ) {
      /* compatible, send string value to be added to 'visiting facilities array' */
      return {
        value: value
          ? data.rows[rowIdx].visiting_facilities.concat(
              colList.find((item) => item.key === colKey)?.label as string
            )
          : data.rows[rowIdx].visiting_facilities.filter(
              (facility) => lodash.snakeCase(facility) !== colKey
            ),
        colKey: 'visiting_facilities',
        rowIdx,
      };
    }
    /* compatibility issue or something wrong with the edit request, ignore */
    return { value: null, colKey: '', rowIdx: -1 };
  };

  return getValue();
};

export default getCollectionFormLogisticsEditCellValue;
