/**
 * ASECCA API type definitions
 *
 * These type definitions directly follow the Asecca API documentation.
 * Only make changes to this file if a corresponding change to the API has
 * been made.
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */

/**
 * Cost Config Applications values
 *
 * @since - 0.0.0
 *
 * @typedef CostsConfigApplication
 */
export type CostsConfigApplication =
  | 'Per Device'
  | 'Per Batch'
  | 'Per Collection'
  | 'Per Project'
  | 'Per Destruction';

/**
 * Cost Config Line Type values
 *
 * @since - 0.0.0
 *
 * @typedef CostsConfigLineType
 */
export type CostsConfigLineType = 'Typical' | 'Custom';

/**
 * Cost Config Cost Source values
 *
 * @since - 0.0.0
 *
 * @typedef CostsConfigCostSource
 */
export type CostsConfigCostSource =
  | 'Global'
  | 'Customer'
  | 'Project'
  | 'Collection';

/**
 * Costs Config data type definition
 *
 * @since - 0.0.0
 *
 * @typedef ICostsConfigData
 * @prop {CostsConfigApplication} application - costs config application type
 * @prop {string | null} collection_charge - collection charge currency value
 * @prop {CostsConfigCostSource} cost_source - cost source type
 * @prop {string | null} customer_charge - customer charge currency value
 * @prop {string | null} effective_charge - effective charge currency value
 * @prop {string | null} global_charge - global charge currency value
 * @prop {CostsConfigLineType} line_type - costs config line type
 * @prop {string} name - name of this costs config
 * @prop {string | null} project_charge - project charge currency value
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

/**
 * Costs Config GET request data payload type definition
 *
 * @since - 0.0.0
 *
 * @typedef ICostsConfigDataPayload
 * @prop {Array<ICostsConfigData>} costs - costs data for API request
 */
export interface ICostsConfigDataPayload {
  costs: Array<ICostsConfigData>;
}

/**
 * Costs Config POST data Costs type definition
 *
 * @since - 0.0.0
 *
 * @typedef ICostsConfigSaveDataCosts
 * @prop {CostsConfigApplication} application - costs config application type
 * @prop {string | null} charge - charge currency amount to save to API
 * @prop {CostsConfigLineType} line_type - costs config line type
 * @prop {string} name - name of costs config to save
 */
export interface ICostsConfigSaveDataCosts {
  application: CostsConfigApplication;
  charge: string | null;
  line_type: CostsConfigLineType;
  name: string;
}

/**
 * Costs Config POST data Selection type definition
 *
 * @since - 0.0.0
 *
 * @typedef ICostsConfigSaveDataSelection
 * @prop {string} collection - collection ID to use as selection
 * @prop {string} project - project ID to use as selection
 * @prop {string} customer - customer ID to use as selection
 * @prop {string} global - global ID to use as selection
 */
export interface ICostsConfigSaveDataSelection {
  collection?: string;
  project?: string;
  customer?: string;
  global?: string;
}

/**
 * Costs Config POST data payload type
 *
 * @since - 0.0.0
 *
 * @typedef ICostsConfigSaveDataPayload
 * @prop {Array<ICostsConfigSaveDataCosts>} costs - costs data to save to API
 * @prop {ICostsConfigSaveDataSelection} selection - costs config selection to save
 */
export interface ICostsConfigSaveDataPayload {
  costs: Array<ICostsConfigSaveDataCosts>;
  selection: ICostsConfigSaveDataSelection;
}

/**
 * Proxy server error return data payload type definition
 *
 * @since - 0.0.0
 *
 * @typedef IProxyErrorPayload
 * @prop {message} string - error message sent back from proxy
 */
export interface IProxyErrorPayload {
  message: string;
}
