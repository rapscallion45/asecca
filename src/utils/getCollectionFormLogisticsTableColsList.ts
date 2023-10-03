import lodash from 'lodash';
import {
  DataTableColumnType,
  IDataTableColumn,
} from '@/components/DataTable/types';
import {
  ICollectionFormLogisticsDataPayload,
  ICollectionFormLogisticsData,
  ICollectionFormLogisticsTypesDataPayload,
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
    .filter((row) =>
      /* only process rows that are inlcuded in compatible types list */
      types.logistics_types.some(
        (type) => type.logistics_type === row.logistics_type
      )
    )
    .map(
      (logisitc: ICollectionFormLogisticsData) =>
        /* map rows with supported logisitcs type name and return compatible facilities */
        types.logistics_types.find(
          (type) => type.logistics_type === logisitc.logistics_type
        )?.compatible_facilities
    )
    .flat(1);

  /* remove 'visiting_facilities' column from orignal cols */
  const filteredOrigCols = columns.filter(
    (col) => col.key !== 'visiting_facilities'
  );

  /* return col list including original cols plus col for each unique facility */
  return filteredOrigCols.concat(
    lodash.uniq(facilityList).map(
      (facility) =>
        ({
          label: facility,
          key: lodash.snakeCase(facility),
          type: 'check' as DataTableColumnType,
        } as IDataTableColumn)
    )
  );
};

export default getCollectionFormLogisticsTableColsList;
