import { IDataTableColumn } from '@/components/DataTable/types';
import {
  ICollectionFormLogisticsData,
  ICollectionFormLogisticsTypesData,
} from '@/lib/api/api-types';

/**
 * Helper function for getting the Collection Form Logistics Cell values
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Utils
 *
 * @param {ICollectionFormLogisticsData} tableRow - row to be processed
 * @param {IDataTableColumn} column - current column to be processed
 * @param {Array<ICollectionFormLogisticsTypesData>} logisticsTypes - logistics types
 * @returns {string | Array<string> | boolean | null} - resulting value string, null or undefined
 */
const getCollectionFormLogisticsCellValue = (
  tableRow: ICollectionFormLogisticsData,
  column: IDataTableColumn,
  logisticsTypes: Array<ICollectionFormLogisticsTypesData>
): string | Array<string> | boolean | null => {
  /* sanity check input */
  if (!tableRow || !column) return null;

  /**
   * Get Value
   *
   * If column is the Logistics Type name, simply return string, else, return
   * true, false or null for whether the facility is visiting, not visiting, or
   * not compatible with logistic type, respectively.
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @returns {string | Array<string> | boolean | null} - charge value, can be null or undefined
   */
  const getValue = (): string | Array<string> | boolean | null => {
    /* if logistics type name col, simply return name string */
    if (column.key === 'logistics_type') return tableRow[column.key];

    /* Check if this row's logistic type is compatible for column's facility name */
    if (
      logisticsTypes
        .find((type) => type.logistics_type === tableRow.logistics_type)
        ?.compatible_facilities.some((facility) => facility === column.label)
    )
      /* facility is compatible, return true or false for listed or not listed */
      return tableRow.visiting_facilities?.some(
        (facility) => facility === column.label
      );

    /* facility not compatible with this row's type, return null indicator */
    return null;
  };

  return getValue();
};

export default getCollectionFormLogisticsCellValue;
