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
 * Devices Table data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef IDevicesTableData
 * @prop {string} collection_id - ID of the collection
 * @prop {string} collection_name - name of the the collection
 * @prop {string} customer - customer name
 * @prop {boolean} destroyed - device to be destroyed flag
 * @prop {string} diagnostics_grade - diagnostic grade score
 * @prop {string} fmip_status - FMIP status
 * @prop {string} frp_status - FRP status
 * @prop {string} imei - IMEI
 * @prop {boolean} in_stock - device is in stock
 * @prop {string} logged_ts - date device was logged
 * @prop {string} manufacturer - manufacturer name
 * @prop {string} mdm_status - MDM status
 * @prop {string} model - model name
 * @prop {string} overall_grade - device overall grade score
 * @prop {string} project - project name
 * @prop {boolean} quarantined - device quarantined flag
 * @prop {string} serial - device serial number
 * @prop {string} smash_test_grade - device smash test grade score
 * @prop {boolean} to_be_destroyed - device to be destroyed flag
 * @prop {string} uid - device UID
 */
export interface IDevicesTableData {
  collection_id: string;
  collection_name: string;
  customer: string;
  destroyed: boolean;
  diagnostics_grade: string;
  fmip_status: string;
  frp_status: string;
  imei: string;
  in_stock: boolean;
  logged_ts: string;
  manufacturer: string;
  mdm_status: string;
  model: string;
  overall_grade: string;
  project: string;
  quarantined: boolean;
  serial: string;
  smash_test_grade: string;
  to_be_destroyed: boolean;
  uid: string;
}

/**
 * Devices Table GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef IDevicesTableDataPayload
 * @prop {Array<IDevicesTableData>} devices - device data for API request
 */
export interface IDevicesTableDataPayload {
  devices: Array<IDevicesTableData>;
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
 * @prop {Array<ICollectionFormLogisticsData>} rows - logistics data for API request
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
 * Collection Form Logistics Types GET request data payload type definition
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

/**
 * Collection Form Schedule data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormScheduleData
 * @prop {string | null} preferred_date - date string in YYYY-MM-DD format
 * @prop {string | null} preferred_time - time string in hh:mm format
 * @prop {string | null} notes - additional notes string
 */
export interface ICollectionFormScheduleData {
  preferred_date: string | null;
  preferred_time: string | null;
  notes: string | null;
}

/**
 * Collection Form Schedule GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormScheduleDataPayload
 */
export interface ICollectionFormScheduleDataPayload
  extends ICollectionFormScheduleData {}

/**
 * Collection Form Schedule POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormScheduleSaveDataPayload
 * @prop {string} collection - ID of the collection to be saved
 */
export interface ICollectionFormScheduleSaveDataPayload
  extends ICollectionFormScheduleData {
  collection: string;
}

/**
 * Collection Form Services On Site Processing values
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @typedef CollectionFormServicesOnSiteProcessing
 */
export type CollectionFormServicesOnSiteProcessing = 'On Site' | 'Off Site';

/**
 * Collection Form Services Type value array
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @constant
 */
export const collectionFormServicesTypes = [
  'WarrantyReturn',
  'StockPurchase',
  'DecommissioningAndRedelivery',
  'Recycling',
  'Destruction',
];

/**
 * Collection Form Services Type
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @typedef CollectionFormServicesType
 */
export type CollectionFormServicesType =
  (typeof collectionFormServicesTypes)[number];

/**
 * Collection Form Services Doesn't Retain Ownership value array
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @constant
 */
export const collectionFormServicesDoesntRetainOwnershipTypes = [
  'RetainsOwnership',
  'DoesntRetainOwnership',
];

/**
 * Collection Form Services Doesn't Retain Ownership value
 *
 * Please refer to Asecca API documentation for more info
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof AseccaAPI
 *
 * @typedef CollectionFormServicesDoesntRetainOwnership
 */
export type CollectionFormServicesDoesntRetainOwnership =
  (typeof collectionFormServicesDoesntRetainOwnershipTypes)[number];

/**
 * Collection Form Services Ownership Retention data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormServicesOwnershipRetentionData
 * @prop {boolean} redelivery_requested - device redelivery requested flag
 */
export interface ICollectionFormServicesOwnershipRetentionData {
  redelivery_requested: boolean;
}

/**
 * Collection Form Services Ownership Retention type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesOwnershipRetention
 * @prop {boolean} redelivery_requested - device redelivery requested flag
 */
export interface ICollectionFormServicesOwnershipRetention {
  RetainsOwnership: ICollectionFormServicesOwnershipRetentionData;
}

/**
 * Collection Form Services Recycling data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesRecyclingData
 * @prop {boolean} decommissioning_requested - device decommission requested flag
 * @prop {CollectionFormServicesDoesntRetainOwnership | ICollectionFormServicesOwnershipRetention} ownership_retention - device ownership retention state
 */
export interface ICollectionFormServicesRecyclingData {
  decommissioning_requested: boolean;
  ownership_retention:
    | CollectionFormServicesDoesntRetainOwnership
    | ICollectionFormServicesOwnershipRetention;
}

/**
 * Collection Form Services Recycling type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesRecyclingData
 * @prop {boolean} decommissioning_requested - device decommission requested flag
 * @prop {ICollectionFormServicesRecyclingData} Recycling - recycling data
 */
export interface ICollectionFormServicesRecycling {
  Recycling: ICollectionFormServicesRecyclingData;
}

/**
 * Collection Form Services Destruction data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesDestructionData
 * @prop {boolean} decommissioning_requested - device decommission requested flag
 */
export interface ICollectionFormServicesDestructionData {
  decommissioning_requested: boolean;
}

/**
 * Collection Form Services Destruction type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesDestructionData
 * @prop {ICollectionFormServicesDestructionData} Destruction - destruction data
 */
export interface ICollectionFormServicesDestruction {
  Destruction: ICollectionFormServicesDestructionData;
}

/**
 * Collection Form Services data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesData
 * @prop {boolean} on_site_processing - on site processing flag
 * @prop {CollectionFormServicesType | ICollectionFormServicesRecycling | ICollectionFormServicesDestruction} service_type - type of the service
 * @prop {string} site_contact - contact for service
 */
export interface ICollectionFormServicesData {
  on_site_processing: boolean;
  service_type:
    | CollectionFormServicesType
    | ICollectionFormServicesRecycling
    | ICollectionFormServicesDestruction;
  site_contact: string;
}

/**
 * Collection Form Services GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesDataPayload
 */
export interface ICollectionFormServicesDataPayload
  extends ICollectionFormServicesData {}

/**
 * Collection Form Services POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServicesSaveDataPayload
 * @prop {string} collection - ID of the collection to be saved
 */
export interface ICollectionFormServicesSaveDataPayload
  extends ICollectionFormServicesData {
  collection: string;
}

/**
 * Collection Form Services Contacts GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormServicesContactsDataPayload
 * @prop {Array<string>} contacts_list - contact names list
 */
export interface ICollectionFormServicesContactsDataPayload {
  contacts_list: Array<string>;
}

/**
 * Collection Form Itinerary data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryData
 * @prop {string} asset_category - name of this itinerary asset category
 * @prop {string | null} packing_details - packing details of this itinerary item
 * @prop {number} quantity - quanity of itinerary item
 */
export interface ICollectionFormItineraryData {
  asset_category: string;
  packing_details: string | null;
  quantity: number;
}

/**
 * Collection Form Itinerary GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryDataPayload
 */
export interface ICollectionFormItineraryDataPayload
  extends Array<ICollectionFormItineraryData> {}

/**
 * Collection Form Itinerary POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItinerarySaveDataPayload
 * @prop {string} collection - ID of the collection to be saved
 * @prop {Array<ICollectionFormItinerarySaveDataCosts>} items - itinerary data to save to API
 */
export interface ICollectionFormItinerarySaveDataPayload {
  collection: string;
  items: Array<ICollectionFormItineraryData>;
}

/**
 * Collection Form Itinerary Asset Category GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryAssetCategoryDataPayload
 */
export interface ICollectionFormItineraryAssetCategoryDataPayload
  extends Array<string> {}

/**
 * Collection Form Facility data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityData
 * @prop {string} asset_category - name of this facility asset category
 * @prop {string | null} facility - name of facility
 * @prop {string | null} workflow - name of workflow
 */
export interface ICollectionFormFacilityData {
  asset_category: string;
  facility: string | null;
  workflow: string | null;
}

/**
 * Collection Form Facility GET request data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityDataPayload
 */
export interface ICollectionFormFacilityDataPayload {
  rows: Array<ICollectionFormFacilityData>;
}

/**
 * Collection Form Facility POST data payload type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilitySaveDataPayload
 * @prop {string} collection - ID of the collection to be saved
 * @prop {Array<ICollectionFormFacilityData>} items - facility data to save to API
 */
export interface ICollectionFormFacilitySaveDataPayload {
  collection: string;
  rows: Array<ICollectionFormFacilityData>;
}

/**
 * Collection Form Facility Asset Category Facilities GET request
 * data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityAssetCategoryFacilitiesDataPayload
 */
export interface ICollectionFormFacilityAssetCategoryFacilitiesDataPayload
  extends Array<string> {}

/**
 * Collection Form Facility Workflows GET request data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityWorkflowsData
 */
export interface ICollectionFormFacilityWorkflowsData {
  name: string;
  advanced: boolean;
}

/**
 * Collection Form Facility Workflows GET request
 * data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityWorkflowsDataPayload
 */
export interface ICollectionFormFacilityWorkflowsDataPayload
  extends Array<ICollectionFormFacilityWorkflowsData> {}

/**
 * New Asset Category data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 *
 * @typedef INewAssetCategoryData
 * @prop {string} name - name of the new asset category
 * @prop {number | null} co2 - co2 of the new asset category
 * @prop {boolean} data_bearing - is new asset category data bearing
 * @prop {boolean} removable_storage - does new asset category have removable storage
 * @prop {boolean} serialized - is new asset category serialized
 * @prop {Array<string | null>} compatible_facilities - new asset category compatible facilities
 */
export interface INewAssetCategoryData {
  name: string;
  co2: number | null;
  data_bearing: boolean;
  removable_storage: boolean;
  serialized: boolean;
  compatible_facilities: Array<string | null>;
}

/**
 * New Asset Category data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 *
 * @typedef INewAssetCategoryDataPayload
 */
export interface INewAssetCategoryDataPayload extends INewAssetCategoryData {}

/**
 * Asset Category Facilities data payload type defintion
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 *
 * @typedef IAssetCategoryFacilitiesDataPayload
 */
export interface IAssetCategoryFacilitiesDataPayload extends Array<string> {}

/**
 * Contact Name data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef IContactNameData
 * @prop {string} prefix - contact's prefix
 * @prop {string} first - contact's first name
 * @prop {string} last - contact's last name
 */
export interface IContactNameData {
  prefix: string;
  first: string;
  last: string;
}

/**
 * New Contact data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef IContactData
 * @prop {IContactNameData} name - name details of the contact
 * @prop {string | null} email - eemail of contact
 * @prop {string | null} job_title - contact's job title
 * @prop {string | null} landline - landline number of contact
 * @prop {string | null} mobile - mobile number of contact
 * @prop {string | null} crm_link - crm link of contact
 * @prop {boolean} sync_to_crm - syn contact to CRM
 */
export interface IContactData {
  name: IContactNameData;
  email: string | null;
  job_title: string | null;
  landline: string | null;
  mobile: string | null;
  crm_link?: string | null;
  sync_to_crm?: boolean;
}

/**
 * Collection Form New Contact data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef INewContactSaveDataPayload
 * @prop {string} collectionId - collection ID to add contact to
 */
export interface ICollectionFormNewContactSaveDataPayload extends IContactData {
  collectionId: string;
}

/**
 * Quote Prices data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IQuotePricesData
 * @prop {string} fully_working - fully working price
 * @prop {string} major_technical_faults - major faults price
 * @prop {string} minor_technical_faults - minor faults price
 * @prop {string} does_not_turn_on - does not turn on price
 */
export interface IQuotePricesData {
  fully_working: string;
  major_technical_faults: string;
  minor_technical_faults: string;
  does_not_turn_on: string;
}

/**
 * Quote data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IQuoteData
 * @prop {string} id - quote ID
 * @prop {string | null} name - quote name
 */
export interface IQuoteData {
  id: string;
  name: string | null;
}

/**
 * Quote Model data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IQuoteModelData
 * @prop {string} id - quote model ID
 * @prop {string | null} display_name - quote model display name
 */
export interface IQuoteModelData {
  id: string;
  display_name: string | null;
}

/**
 * Quote Models Price data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IQuoteModelPriceData
 * @prop {string} id - model ID to be save
 * @prop {IQuotePricesData} prices - quote prices data to save
 */
export interface IQuoteModelPriceData {
  id: string;
  prices: IQuotePricesData;
}

/**
 * Quote Model Full data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IQuoteModelFullData
 * @prop {IQuoteModelData} model - quote model data
 * @prop {IQuotePricesData} prices - quote prices data
 */
export interface IQuoteModelFullData {
  model: IQuoteModelData;
  prices: IQuotePricesData;
}

/**
 * Quote Conflicts data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IQuoteConflictsData
 * @prop {IQuoteData} quote - quote data
 * @prop {IQuotePricesData} prices - quote prices data
 */
export interface IQuoteConflictsData {
  quote: IQuoteData;
  price: IQuotePricesData;
}

/**
 * Quote Preview data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteConflictsData
 * @prop {IQuoteModelFullData} model - quote model data
 * @prop {Array<IQuoteConflictsData>} conflicting_quotes - quote conflicts
 */
export interface ICollectionFormQuoteConflictsData {
  model: IQuoteModelFullData;
  conflicting_quotes: Array<IQuoteConflictsData>;
}

/**
 * Collection Form Quote data type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteData
 * @prop {Array<IQuoteData>} quotes - quote data
 * @prop {Array<IQuoteModelFullData>} preview - quote preview data
 * @prop {Array<ICollectionFormQuoteConflictsData> } conflicts - quote conflicts data
 */
export interface ICollectionFormQuoteData {
  quotes: Array<IQuoteData>;
  preview: Array<IQuoteModelFullData>;
  conflicts: Array<ICollectionFormQuoteConflictsData>;
}

/**
 * Collection Form Quote data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteDataPayload
 */
export interface ICollectionFormQuoteDataPayload
  extends ICollectionFormQuoteData {}

/**
 * Collection Form Quote save data payload type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteSaveDataPayload
 * @prop {string | Array<string | null>} collection - collection ID to save quote for
 * @prop {string} expires - expiry date of quote
 * @prop {Array<ICollectionFormQuoteModelsSaveData> } models - quote model data
 */
export interface ICollectionFormQuoteSaveDataPayload {
  collection: string | Array<string | null>;
  expires: string;
  models: Array<IQuoteModelPriceData>;
}
