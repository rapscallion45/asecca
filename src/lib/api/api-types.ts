/*
 * ASECCA API type definitions
 *
 * These type definitions directly follow the Asecca API documentation.
 * Only make changes to this file if a corresponding change to the API has
 * been made.
 */

/**
 * Cost Config Applications values
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof AseccaAPI
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
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof AseccaAPI
 *
 * @typedef CostsConfigLineType
 */
export type CostsConfigLineType = 'Typical' | 'Custom';

/**
 * Cost Config Cost Source values
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof AseccaAPI
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
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
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
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
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
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
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
 * Costs Config data selection type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigDataSelection
 * @prop {string} collection - collection ID to use as selection
 * @prop {string} project - project ID to use as selection
 * @prop {string} customer - customer ID to use as selection
 * @prop {string} global - global ID to use as selection
 */
export interface ICostsConfigDataSelection {
  collection?: string;
  project?: string;
  customer?: string;
  global?: string;
}

/**
 * Costs Config POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigSaveDataPayload
 * @prop {Array<ICostsConfigSaveDataCosts>} costs - costs data to save to API
 * @prop {ICostsConfigSaveDataSelection} selection - costs config selection to save
 */
export interface ICostsConfigSaveDataPayload {
  costs: Array<ICostsConfigSaveDataCosts>;
  selection: ICostsConfigDataSelection;
}

/**
 * Proxy server error return data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IProxyErrorPayload
 * @prop {message} string - error message sent back from proxy
 */
export interface IProxyErrorPayload {
  message: string;
}

/**
 * Kanban Collection Task Status values
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof AseccaAPI
 *
 * @typedef KanbanCollectionTaskStatus
 */
export type KanbanCollectionTaskStatus =
  | 'InboundOrderCreated'
  | 'InboundOrderRequested'
  | 'SOWDefined'
  | 'SOWApproved'
  | 'Booked'
  | 'Collected'
  | 'Delivered'
  | 'DevicesBookedIn'
  | 'Reported';

/**
 * Kanban Board Task type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardTask
 * @prop {string | null} name - task name
 * @prop {string} id - task ID
 * @prop {string} status - task status
 */
export interface IKanbanBoardTask {
  name: string | null;
  id: string;
  status: string;
}

/**
 * Kanban Board Group type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IKanbanBoardGroup
 * @prop {string | null} name - group name
 * @prop {string} id - group ID
 * @prop {string} status - group status
 * @prop {number} total_tasks - number of tasks in group
 */
export interface IKanbanBoardGroup {
  name: string | null;
  id: string;
  status: string;
  total_tasks: number;
}

/**
 * Kanban Board Column type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardColumn
 * @prop {string} name - column name
 * @prop {Array<IKanbanBoardTask>} tasks - column tasks
 * @prop {Array<IKanbanBoardGroup>} groups - column groups
 */
export interface IKanbanBoardColumn {
  name: string;
  tasks: Array<IKanbanBoardTask>;
  groups?: Array<IKanbanBoardGroup>;
}

/**
 * Kanban Board type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoard
 * @prop {boolean} isActive - board active flag
 * @prop {string} name - board name
 * @prop {Array<IKanbanBoardColumn>} columns - board columns
 */
export interface IKanbanBoard {
  name: string;
  columns: Array<IKanbanBoardColumn>;
}

/**
 * Collections Kanban Board data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IKanbanBoardCollectionsDataPayload
 * @prop {Array<IKanbanBoard>} boards - kanban board dataset
 */
export interface IKanbanBoardCollectionsDataPayload {
  collections: IKanbanBoard;
}

/**
 * Collection Form Costs data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsData
 * @prop {string} chargeable - name of this costs row
 * @prop {string | null} global_charge - global charge currency value
 * @prop {string | null} customer_charge - customer charge currency value
 * @prop {string | null} project_charge - project charge currency value
 * @prop {string | null} collection_charge - collection charge currency value
 * @prop {string | null} effective_charge - effective charge currency value
 */
export interface ICollectionFormCostsData {
  chargeable: string;
  global_charge?: string | null;
  customer_charge?: string | null;
  project_charge?: string | null;
  collection_charge?: string | null;
  effective_charge: string | null;
}

/**
 * Collection Form Costs GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsDataPayload
 * @prop {Array<ICollectionFormCostsData>} costs - costs data for API request
 */
export interface ICollectionFormCostsDataPayload {
  rows: Array<ICollectionFormCostsData>;
}

/**
 * Collection Form Costs POST data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsSaveDataCosts
 * @prop {string} chargeable - Charge name
 * @prop {string | null} charge - charge currency amount to save to API
 */
export interface ICollectionFormCostsSaveDataCosts {
  chargeable: string;
  charge: string | null;
}

/**
 * Collection Form Costs POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsSaveDataPayload
 * @prop {string} collection - ID of the collection to be saved
 * @prop {Array<ICollectionFormCostsSaveDataCosts>} rows - costs data to save to API
 */
export interface ICollectionFormCostsSaveDataPayload {
  collection: string;
  rows: Array<ICollectionFormCostsSaveDataCosts>;
}

/**
 * Collection Form Logistics data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsData
 * @prop {string} logistics_type - name of this logistics type
 * @prop {Array<string>} visiting_facilities - array of facility names for type
 */
export interface ICollectionFormLogisticsData {
  logistics_type: string;
  visiting_facilities: Array<string>;
}

/**
 * Collection Form Logistics GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsDataPayload
 * @prop {Array<ICollectionFormLogisticsData>} costs - logistics data for API request
 */
export interface ICollectionFormLogisticsDataPayload {
  rows: Array<ICollectionFormLogisticsData>;
}

/**
 * Collection Form Logistics POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsSaveDataPayload
 * @prop {string} collection - ID of the collection to be saved
 * @prop {Array<ICollectionFormLogisticsSaveDataCosts>} rows - costs data to save to API
 */
export interface ICollectionFormLogisticsSaveDataPayload {
  collection: string;
  rows: Array<ICollectionFormLogisticsData>;
}

/**
 * Collection Form Logistics Types data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsTypesData
 * @prop {string} logistics_type - name of this logistics type
 * @prop {Array<string>} compatible_facilities - array of facility names for type
 */
export interface ICollectionFormLogisticsTypesData {
  logistics_type: string;
  compatible_facilities: Array<string>;
}

/**
 * Collection Form Logistics GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsTypesDataPayload
 * @prop {Array<ICollectionFormLogisticsTypesData>} logistics_types - logistics types data
 */
export interface ICollectionFormLogisticsTypesDataPayload {
  logistics_types: Array<ICollectionFormLogisticsTypesData>;
}
