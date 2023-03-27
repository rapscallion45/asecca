/*
 ** Costs Config return data type definition
 */
export type CostsConfigData = {
  application:
    | 'Per Device'
    | 'Per Batch'
    | 'Per Collection'
    | 'Per Project'
    | 'Per Destruction';
  collection_charge?: number | null;
  cost_source: 'Global' | 'Customer' | 'Project' | 'Collection';
  customer_charge?: number | null;
  effective_charge: number | null;
  global_charge?: number | null;
  line_type: 'Typical' | 'Custom';
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
 ** Proxy Error return data payload type definition
 */
export type ProxyErrorPayload = {
  message: string;
};
