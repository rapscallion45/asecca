import {
  DataTableColumn,
  CostsConfigRowTypical,
  CostsConfigRowCustom,
} from '@/components/DataTable/types';

/*
 ** helper function for getting the Prevailing charge of a Costs Config scope
 */
const getCostsConfigPrevailingCharge = (
  row: CostsConfigRowTypical | CostsConfigRowCustom,
  editCol: DataTableColumn | undefined | null
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
  if (!row || !editCol) return null;

  /* firstly, if editable col is not null, simply return editable col value */
  if (row[editCol?.key] !== null)
    return parseFloat(row[editCol?.key]).toFixed(2);

  /*
   ** if editable col is null, determine charge according to
   ** the col permission hierachy
   */
  const getCharge = () => {
    switch (editCol?.label) {
      case 'Collection':
        /* if Collection, run through all other columns */
        if (row.project_charge !== null && row.project_charge !== undefined)
          return parseFloat(row.project_charge).toFixed(2);
        if (row.customer_charge !== null && row.customer_charge !== undefined)
          return parseFloat(row.customer_charge).toFixed(2);
        if (row.global_charge !== null)
          return parseFloat(row.global_charge).toFixed(2);
        return null;
      case 'Project':
        /* if Project, only run through columns below Project */
        if (row.customer_charge !== null && row.customer_charge !== undefined)
          return parseFloat(row.customer_charge).toFixed(2);
        if (row.global_charge !== null)
          return parseFloat(row.global_charge).toFixed(2);
        return null;
      case 'Customer':
        /* if Customer, only run through columns below Customer */
        if (row.global_charge !== null)
          return parseFloat(row.global_charge).toFixed(2);
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
