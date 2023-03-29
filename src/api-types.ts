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
 ** Costs Config return data type definition
 */
export interface ICostsConfigData {
  application: CostsConfigApplication;
  collection_charge?: number | null;
  cost_source: CostsConfigCostSource;
  customer_charge?: number | null;
  effective_charge: number | null;
  global_charge?: number | null;
  line_type: CostsConfigLineType;
  name: string;
  project_charge?: number | null;
}

/*
 ** Costs Config return data payload type definition
 */
export interface ICostsConfigDataPayload {
  costs: Array<ICostsConfigData>;
}

/*
 ** Costs Config save data costs type
 */
export interface ICostsConfigSaveDataCosts {
  application: CostsConfigApplication;
  charge: string;
  line_type: CostsConfigLineType;
  name: string;
}

/*
 ** Costs Config save data selection type
 */
export interface ICostsConfigSaveDataSelection {
  collection?: number;
  project?: number;
  customer?: number;
  global?: number;
}

/*
 ** Costs Config save data payload type
 */
export interface ICostsConfigSaveDataPayload {
  costs: Array<ICostsConfigSaveDataCosts>;
  selection: ICostsConfigSaveDataSelection;
}

/*
 ** Proxy Error return data payload type definition
 */
export interface IProxyErrorPayload {
  message: string;
}
