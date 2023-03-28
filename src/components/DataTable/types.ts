import { CostsConfigApplication, CostsConfigCostSource } from '@/api-types';

/*
 ** type definition for data table column props
 */
export type DataTableColumn = {
  label: string;
  key: string;
};

/*
 ** type definition for Costs Config "Typical" data row
 */
export type CostsConfigRowTypical = {
  application: CostsConfigApplication;
  collection_charge: string | null;
  cost_source: CostsConfigCostSource;
  customer_charge: string | null;
  effective_charge: string | null;
  global_charge: string | null;
  line_type: string | null;
  name: string;
  project_charge: string | null;
};

/*
 ** type definition for Costs Config "Custom" data row
 */
export type CostsConfigRowCustom = any;
