import { ICollectionFormCostsData } from '@/lib/api/api-types';

/**
 * Helper function for getting the Prevailing charge of a
 * Collection Form Costs scope
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Utils
 *
 * @param {ICollectionFormCostsData} tableRow - row to be processed for 'Prevailing'
 * @returns {string | null | undefined} - resulting value string, null or undefined
 */
const getCollectionFormCostsPrevailingCharge = (
  tableRow: ICollectionFormCostsData
): string | null | undefined => {
  /**
   * the 'Prevailing' column of a collection form costs table row is always equal
   * to the collection column, unless collection column is null.
   * if null, Prevailing is equal to the "effective_charge" column.
   */

  /* sanity check input */
  if (!tableRow) return null;

  /**
   * Get Charge
   *
   * If collection column value has been entered, return collection value,
   * else, return effective charge value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @returns {string | null | undefined} - charge value, can be null or undefined
   */
  const getCharge = (): string | null | undefined => {
    if (
      tableRow.collection_charge !== null &&
      tableRow.collection_charge !== undefined
    )
      return tableRow.collection_charge;
    return tableRow.effective_charge;
  };

  return getCharge();
};

export default getCollectionFormCostsPrevailingCharge;
