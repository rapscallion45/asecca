/*
 **
 ** ASECCA API type definitions
 **
 ** These type definitions directly follow the Asecca API documentation.
 ** Only make changes to this file if a corresponding change to the API has
 ** been made.
 */

/*
 ** Primitive API types
 */
export type CostsConfigApplication =
  | 'Per Device'
  | 'Per Batch'
  | 'Per Collection'
  | 'Per Project'
  | 'Per Destruction';

export type CostsConfigLineType = 'Typical' | 'Custom';

export type CostsConfigCostSource =
  | 'Global'
  | 'Customer'
  | 'Project'
  | 'Collection';

/*
 ** Costs Config data type definition
 */
export interface ICostsConfigData {
  application: CostsConfigApplication;
  collection_charge?: string | null;
  cost_source: CostsConfigCostSource;
  customer_charge?: string | null;
  effective_charge: string | null;
  global_charge?: string | null;
  line_type: CostsConfigLineType;
  name: string;
  project_charge?: string | null;
}

/*
 ** Costs Config GET request data payload type definition
 */
export interface ICostsConfigDataPayload {
  costs: Array<ICostsConfigData>;
}

/*
 ** Costs Config POST data Costs type definition
 */
export interface ICostsConfigSaveDataCosts {
  application: CostsConfigApplication;
  charge: string | null;
  line_type: CostsConfigLineType;
  name: string;
}

/*
 ** Costs Config POST data Selection type definition
 */
export interface ICostsConfigSaveDataSelection {
  collection?: string;
  project?: string;
  customer?: string;
  global?: string;
}

/*
 ** Costs Config POST data payload type
 */
export interface ICostsConfigSaveDataPayload {
  costs: Array<ICostsConfigSaveDataCosts>;
  selection: ICostsConfigSaveDataSelection;
}

/*
 ** Proxy server error return data payload type definition
 */
export interface IProxyErrorPayload {
  message: string;
}
