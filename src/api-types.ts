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
export type CostsConfigData = {
  application: CostsConfigApplication;
  collection_charge?: number | null;
  cost_source: CostsConfigCostSource;
  customer_charge?: number | null;
  effective_charge: number | null;
  global_charge?: number | null;
  line_type: CostsConfigLineType;
  name: string;
  project_charge?: number | null;
};

/*
 ** Costs Config return data payload type definition
 */
export type CostsConfigDataPayload = {
  costs: Array<CostsConfigData>;
};

/*
 ** Costs Config save data costs type
 */
export type CostsConfigSaveDataCosts = {
  application: CostsConfigApplication;
  charge: string;
  line_type: CostsConfigLineType;
  name: string;
};

/*
 ** Costs Config save data selection type
 */
export type CostsConfigSaveDataSelection = {
  collection?: number;
  project?: number;
  customer?: number;
  global?: number;
};

/*
 ** Costs Config save data payload type
 */
export type CostsConfigSaveDataPayload = {
  costs: Array<CostsConfigSaveDataCosts>;
  selection: CostsConfigSaveDataSelection;
};

/*
 ** Proxy Error return data payload type definition
 */
export type ProxyErrorPayload = {
  message: string;
};
