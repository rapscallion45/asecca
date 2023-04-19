import { ICostsConfigData } from '@/lib/api/api-types';
import { IUserPermissionLevelState } from '@/redux/types';

/**
 * Helper function for getting the Prevailing charge of a Costs Config scope
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @param {ICostsConfigData} tableRow - table row to be processed for 'Prevailing'
 * @param {IUserPermissionLevelState} permissionLevel - permission level to process
 * @returns {string | null | undefined} - resulting value string, null or undefined
 */
const getCostsConfigPrevailingCharge = (
  tableRow: ICostsConfigData,
  permissionLevel: IUserPermissionLevelState
): string | null | undefined => {
  /**
   * the 'Prevailing' column of a costs config table row is always equal
   * to the editable col (permission level), unless editable col
   * is null.
   * if null, Prevailing is equal to the "cost_source" column, if not
   * set to the editable col, else, the next value available in the row
   * according to permission hierachy:
   * Collection (highest) -> Project -> Customer > Global (lowest)
   */

  /** sanity check input */
  if (!tableRow || !permissionLevel) return null;

  /** firstly, if editable col is not null or undefined, return edit col value */
  const editCellKey = `${permissionLevel.level.toLowerCase()}_charge`;
  if (
    tableRow[editCellKey as keyof ICostsConfigData] !== null &&
    tableRow[editCellKey as keyof ICostsConfigData] !== undefined
  )
    return tableRow[editCellKey as keyof ICostsConfigData];

  /**
   * Get Charge
   *
   * if editable col is null, determine charge according to
   * the col permission hierachy
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @returns {string | null | undefined} - charge value, can be null or undefined
   */
  const getCharge = (): string | null | undefined => {
    switch (permissionLevel.level) {
      case 'Collection':
        /** if Collection, run through all other columns */
        if (
          tableRow.project_charge !== null &&
          tableRow.project_charge !== undefined
        )
          return tableRow.project_charge;
        if (
          tableRow.customer_charge !== null &&
          tableRow.customer_charge !== undefined
        )
          return tableRow.customer_charge;
        if (tableRow.global_charge !== null) return tableRow.global_charge;
        return null;
      case 'Project':
        /** if Project, only run through columns below Project */
        if (
          tableRow.customer_charge !== null &&
          tableRow.customer_charge !== undefined
        )
          return tableRow.customer_charge;
        if (tableRow.global_charge !== null) return tableRow.global_charge;
        return null;
      case 'Customer':
        /** if Customer, only run through columns below Customer */
        if (tableRow.global_charge !== null) return tableRow.global_charge;
        return null;
      case 'Global':
      default:
        /** if Global, no checks needed, value is null at this point */
        return null;
    }
  };

  return getCharge();
};

export default getCostsConfigPrevailingCharge;
