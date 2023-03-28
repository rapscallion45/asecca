import { DataTableColumn } from '@/components/DataTable/types';

/*
 ** helper function for getting the Prevailing charge of a costs config scope
 */
const getCostsConfigPrevailingCharge = (row: any, editCol: DataTableColumn) => {
  /*
   ** the 'Prevailing' column of a costs config table row is always equal
   ** to the editable col (permission level), unless editable col
   ** is null.
   ** if null, Prevailing is equal to the "cost_source" column, if not
   ** set to the editable col, else, the next value available in the row
   ** according to permission hierachy:
   ** Collection (highest) -> Project -> Customer > Global (lowest)
   */

  /* firstly, if editable col is not null, simply return editable col value */
  if (row[editCol?.key] !== null)
    return parseFloat(row[editCol?.key]).toFixed(2);

  /*
   ** if editbale col is null, return "effective charge" value if
   ** "cost source" is not set to the editable col value
   */
  if (row.cost_source !== editCol?.label) return row.effective_charge;

  /*
   ** if editable col ius null and editbale col and "effective charge" are
   ** same "cost source", determine charge according to the permission hierachy
   */
  const getCharge = () => {
    switch (editCol?.label) {
      case 'Collection':
        if (row.project_charge !== null) return row.project_charge;
        if (row.customer_charge !== null) return row.customer_charge;
        return row.global_charge;
      case 'Project':
        if (row.customer_charge !== null) return row.customer_charge;
        return row.global_charge;
      case 'Customer':
        return row.global_charge;
      default:
        return null;
    }
  };

  return getCharge();
};

export default getCostsConfigPrevailingCharge;
