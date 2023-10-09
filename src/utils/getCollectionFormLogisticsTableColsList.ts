import lodash from 'lodash';
import {
  DataTableColumnType,
  IDataTableColumn,
} from '@/components/DataTable/types';
import {
  ICollectionFormLogisticsDataPayload,
  ICollectionFormLogisticsData,
  ICollectionFormLogisticsTypesDataPayload,
  ICollectionFormLogisticsTypesData,
} from '@/lib/api/api-types';

/**
 * Return list of columns for Collection Form Logistics
 * data table according to the static columns and dynamic passed
 * Logistics Types from API
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Utils
 *
 * @param {Array<IDataTableColumn>} columns - list of fixed columns for the table
 * @param {ICollectionFormLogisticsDataPayload} data - passed logistics data from API
 * @param {ICollectionFormLogisticsTypesDataPayload} types - passed logistics types from API
 * @returns {Array<IDataTableColumn>} - columns for passed logistics types
 */
const getCollectionFormLogisticsTableColsList = (
  columns: Array<IDataTableColumn>,
  data: ICollectionFormLogisticsDataPayload,
  types: ICollectionFormLogisticsTypesDataPayload
): Array<IDataTableColumn> => {
  /**
   * begin by building list of all facilities returned from API against known
   * compatible list
   */
  const facilityList = data.rows
    .filter((row: ICollectionFormLogisticsData) =>
      /* only process rows that are included in compatible types list */
      types.logistics_types.some(
        (type: ICollectionFormLogisticsTypesData) =>
          type.logistics_type === row.logistics_type
      )
    )
    .map(
      (logisitc: ICollectionFormLogisticsData) =>
        /* map rows with supported logistics type and return compatible facilities */
        types.logistics_types.find(
          (type: ICollectionFormLogisticsTypesData) =>
            type.logistics_type === logisitc.logistics_type
        )?.compatible_facilities
    )
    .flat(1);

  /* remove 'visiting_facilities' column from orignal cols */
  const filteredOrigCols = columns.filter(
    (col: IDataTableColumn) => col.key !== 'visiting_facilities'
  );

  /* add logistic type select options */
  const newCols = filteredOrigCols.map((col: IDataTableColumn) => {
    if (col.key === 'logistics_type')
      return {
        ...col,
        selectOptions: types.logistics_types.map(
          (type: ICollectionFormLogisticsTypesData) => type.logistics_type
        ),
      };
    return col;
  });

  /* return sorted col list including col for each unique facility */
  return newCols.concat(
    lodash.sortBy(
      lodash.uniq(facilityList).map(
        (facility: string | undefined) =>
          ({
            label: facility,
            key: lodash.snakeCase(facility),
            type: 'check' as DataTableColumnType,
          } as IDataTableColumn)
      ),
      (item: IDataTableColumn) => item.key
    )
  );
};

export default getCollectionFormLogisticsTableColsList;
