import { ICostsConfigData } from '@/lib/api/api-types';
import { IUserPermissionLevelState } from '@/redux/types';

/*
 ** helper function for getting the Prevailing charge of a Costs Config scope
 */
const getCostsConfigPrevailingCharge = (
  tableRow: ICostsConfigData,
  permissionLevel: IUserPermissionLevelState
) => {
  /*
   ** the 'Prevailing' column of a costs config table row is always equal
   ** to the editable col (permission level), unless editable col
   ** is null.
   ** if null, Prevailing is equal to the "cost_source" column, if not
   ** set to the editable col, else, the next value available in the row
   ** according to permission hierachy:
   ** Collection (highest) -> Project -> Customer > Global (lowest)
   */

  /* sanity check input */
  if (!tableRow || !permissionLevel) return null;

  /* firstly, if editable col is not null, simply return editable col value */
  const editCellKey = `${permissionLevel.level.toLowerCase()}_charge`;
  if (tableRow[editCellKey as keyof ICostsConfigData] !== null)
    return tableRow[editCellKey as keyof ICostsConfigData];

  /*
   ** if editable col is null, determine charge according to
   ** the col permission hierachy
   */
  const getCharge = () => {
    switch (permissionLevel.level) {
      case 'Collection':
        /* if Collection, run through all other columns */
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
        /* if Project, only run through columns below Project */
        if (
          tableRow.customer_charge !== null &&
          tableRow.customer_charge !== undefined
        )
          return tableRow.customer_charge;
        if (tableRow.global_charge !== null) return tableRow.global_charge;
        return null;
      case 'Customer':
        /* if Customer, only run through columns below Customer */
        if (tableRow.global_charge !== null) return tableRow.global_charge;
        return null;
      case 'Global':
      default:
        /* if Global, no checks needed, value is null at this point */
        return null;
    }
  };

  return getCharge();
};

export default getCostsConfigPrevailingCharge;
