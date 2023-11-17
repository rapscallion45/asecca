import { SnackbarKey } from 'notistack';
import { AlertColor } from '@mui/material';
import {
  CostsConfigCostSource,
  ICostsConfigDataPayload,
  ICostsConfigSaveDataPayload,
  IKanbanBoardColumn,
  IKanbanBoard,
  ICollectionFormCostsDataPayload,
  ICollectionFormCostsSaveDataPayload,
  ICollectionFormLogisticsDataPayload,
  ICollectionFormLogisticsSaveDataPayload,
  ICollectionFormLogisticsTypesDataPayload,
  ICollectionFormScheduleDataPayload,
  ICollectionFormScheduleSaveDataPayload,
  ICollectionFormServiceDataPayload,
  ICollectionFormServiceSaveDataPayload,
  ICollectionFormServiceContactsDataPayload,
  ICollectionFormServiceRecycling,
  ICollectionFormServiceDestruction,
  ICollectionFormItineraryDataPayload,
  ICollectionFormItinerarySaveDataPayload,
  ICollectionFormItineraryAssetCategoryDataPayload,
  ICollectionFormFacilityDataPayload,
  ICollectionFormFacilitySaveDataPayload,
  ICollectionFormFacilityWorkflowsDataPayload,
  ICollectionFormFacilityAssetCategoryFacilitiesDataPayload,
  IQuoteSummaryData,
  ICollectionFormQuoteDataPayload,
  ICollectionFormQuoteSaveDataPayload,
  IQuoteConflictsData,
  IQuotePricedModelData,
  INewAssetCategoryDataPayload,
  ICollectionFormSOWDataPayload,
  ICollectionFormSOWValidDataPayload,
} from '@/lib/api/api-types';
import { DataTableRowCellValue } from '@/components/DataTable/types';

/**
 * Type and interface definitions for Redux actions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Theme Type options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof ThemeReduxSlice
 *
 * @typedef ThemeType - theme can either be 'light' or 'dark' mode
 */
export type ThemeType = 'light' | 'dark';

/**
 * Fetch Costs Config args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IFetchCostsConfigBySourceIdArgs
 * @prop {CostsConfigCostSource} source - costs config cost source option
 * @prop {string} dataId - costs config ID to be fetched
 */
export interface IFetchCostsConfigBySourceIdArgs {
  source: CostsConfigCostSource;
  dataId: string | (string | null)[];
}

/**
 * Save Costs Config args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ISaveCostsConfigBySourceIdArgs
 * @prop {ICostsConfigSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCostsConfigBySourceIdArgs {
  data: ICostsConfigSaveDataPayload;
}

/**
 * Costs Config edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigEditCostsPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited cost
 * @prop {DataTableRowCellValue} value - updated column value
 */
export interface ICostsConfigEditCostsPayload {
  colKey: string;
  rowIdx: number;
  value: DataTableRowCellValue;
}

/**
 * Costs Config state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigState
 * @prop {boolean} loading - costs config loading state
 * @prop {ICostsConfigDataPayload} data - currently loaded costs config data
 * @prop {ICostsConfigDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of costs config
 * @prop {boolean} saving - saving state flag of costs config data
 * @prop {boolean} edited - costs config data has been edited flag
 */
export interface ICostsConfigState {
  loading: boolean;
  data: ICostsConfigDataPayload;
  dataShadow: ICostsConfigDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
}

/**
 * Fetch Collection Form Costs args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef IFetchCollectionFormCostsByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormCostsByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Costs args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ISaveCollectionFormCostsByCollectionIdArgs
 * @prop {ICollectionFormCostsSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormCostsByCollectionIdArgs {
  data: ICollectionFormCostsSaveDataPayload;
}

/**
 * Collection Form Costs edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsEditCostsPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited cost
 * @prop {DataTableRowCellValue} value - updated column value
 */
export interface ICollectionFormCostsEditCostsPayload {
  colKey: string;
  rowIdx: number;
  value: DataTableRowCellValue;
}

/**
 * Collection Form Costs state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormCostsState
 * @prop {boolean} loading - costs loading state
 * @prop {ICollectionFormCostsDataPayload} data - currently loaded costs data
 * @prop {ICollectionFormCostsDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of costs
 * @prop {boolean} saving - saving state flag of costs data
 * @prop {boolean} edited - costs data has been edited flag
 */
export interface ICollectionFormCostsState {
  loading: boolean;
  data: ICollectionFormCostsDataPayload;
  dataShadow: ICollectionFormCostsDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
}

/**
 * Fetch Collection Form Logistics args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef IFetchCollectionFormLogisticsByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormLogisticsByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Logistics args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ISaveCollectionFormLogisticsByCollectionIdArgs
 * @prop {ICollectionFormLogisticsSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormLogisticsByCollectionIdArgs {
  data: ICollectionFormLogisticsSaveDataPayload;
}

/**
 * Collection Form Logistics edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsEditCostsPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited cost
 * @prop {DataTableRowCellValue} value - updated column value
 */
export interface ICollectionFormLogisticsEditLogisticsPayload {
  colKey: string;
  rowIdx: number;
  value: DataTableRowCellValue;
}

/**
 * Collection Form Logistics delete redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsDeleteLogisticsPayload
 * @prop {number} rowIdx - table row index to be deleted
 */
export interface ICollectionFormLogisticsDeleteLogisticsPayload {
  rowIdx: number;
}

/**
 * Collection Form Logistics state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormLogisticsState
 * @prop {boolean} loading - logistics loading state
 * @prop {ICollectionFormLogisticsDataPayload} data - currently loaded logistics data
 * @prop {ICollectionFormLogisticsDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of costs
 * @prop {boolean} saving - saving state flag of costs data
 * @prop {boolean} edited - costs data has been edited flag
 * @prop {boolean} loadingTypes - loading logistics types from API
 * @prop {ICollectionFormLogisticsTypesDataPayload} types - logistics types from API
 */
export interface ICollectionFormLogisticsState {
  loading: boolean;
  data: ICollectionFormLogisticsDataPayload;
  dataShadow: ICollectionFormLogisticsDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
  loadingTypes: boolean;
  types: ICollectionFormLogisticsTypesDataPayload;
}

/**
 * Fetch Collection Form Itinerary args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef IFetchCollectionFormItineraryByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormItineraryByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Itinerary args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ISaveCollectionFormItineraryByCollectionIdArgs
 * @prop {ICollectionFormItinerarySaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormItineraryByCollectionIdArgs {
  data: ICollectionFormItinerarySaveDataPayload;
}

/**
 * Collection Form Itinerary edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryEditItineraryPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited itinerary
 * @prop {DataTableRowCellValue} value - updated column value
 */
export interface ICollectionFormItineraryEditItineraryPayload {
  colKey: string;
  rowIdx: number;
  value: DataTableRowCellValue;
}

/**
 * Collection Form Itinerary delete redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryDeleteItinerayPayload
 * @prop {number} rowIdx - table row index to be deleted
 */
export interface ICollectionFormItineraryDeleteItineraryPayload {
  rowIdx: number;
}

/**
 * Collection Form Itinerary state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ICollectionFormItineraryState
 * @prop {boolean} loading - itinerary loading state
 * @prop {ICollectionFormItineraryDataPayload} data - currently loaded itinerary data
 * @prop {ICollectionFormItineraryDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of itinerary
 * @prop {boolean} saving - saving state flag of itinerary data
 * @prop {boolean} edited - itinerary data has been edited flag
 * @prop {boolean} loadingTypes - loading itinerary asset categories from API
 * @prop {boolean} savingNewAssetCategory - saving new asset category to API flag
 * @prop {string} errorNewAssetCategory - saving new asset category error msg
 * @prop {ICollectionFormItineraryAssetCategoryDataPayload} assetCategories - itinerary asset categories from API
 */
export interface ICollectionFormItineraryState {
  loading: boolean;
  data: ICollectionFormItineraryDataPayload;
  dataShadow: ICollectionFormItineraryDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
  loadingAssetCategories: boolean;
  savingNewAssetCategory: boolean;
  errorNewAssetCategory?: string;
  assetCategories: ICollectionFormItineraryAssetCategoryDataPayload;
}

/**
 * Fetch Collection Form Schedule args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef IFetchCollectionFormScheduleByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormScheduleByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Schedule args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ISaveCollectionFormScheduleByCollectionIdArgs
 * @prop {ICollectionFormScheduleSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormScheduleByCollectionIdArgs {
  data: ICollectionFormScheduleSaveDataPayload;
}

/**
 * Collection Form Schedule edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormScheduleEditCostsPayload
 * @prop {string} itemKey - data item key to be edited
 * @prop {string | null} value - updated form value
 */
export interface ICollectionFormScheduleEditSchedulePayload {
  itemKey: string;
  value: string | null;
}

/**
 * Collection Form Schedule state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICollectionFormScheduleState
 * @prop {boolean} loading - schedule loading state
 * @prop {ICollectionFormScheduleDataPayload} data - currently loaded schedule data
 * @prop {ICollectionFormScheduleDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of schedule
 * @prop {boolean} saving - saving state flag of schedule data
 * @prop {boolean} edited - schedule data has been edited flag
 */
export interface ICollectionFormScheduleState {
  loading: boolean;
  data: ICollectionFormScheduleDataPayload;
  dataShadow: ICollectionFormScheduleDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
}

/**
 * Fetch Collection Form Service args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef IFetchCollectionFormServiceByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormServiceByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Service args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ISaveCollectionFormServiceByCollectionIdArgs
 * @prop {ICollectionFormServiceSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormServiceByCollectionIdArgs {
  data: ICollectionFormServiceSaveDataPayload;
}

/**
 * Collection Form Service edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServiceEditServicePayload
 * @prop {string} itemKey - data item key to be edited
 * @prop {string | boolean | ICollectionFormServiceRecyclingData | ICollectionFormServiceDestructionData} value - updated form value
 */
export interface ICollectionFormServiceEditServicePayload {
  itemKey: string;
  value:
    | string
    | boolean
    | ICollectionFormServiceRecycling
    | ICollectionFormServiceDestruction;
}

/**
 * Collection Form Service state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @typedef ICollectionFormServiceState
 * @prop {boolean} loading - services loading state
 * @prop {ICollectionFormServiceDataPayload} data - currently loaded services data
 * @prop {ICollectionFormServiceDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of services
 * @prop {boolean} saving - saving state flag of services data
 * @prop {boolean} edited - services data has been edited flag
 * @prop {boolean} loadingContacts - loading contacts types from API
 * @prop {ICollectionFormLogisticsTypesDataPayload} contacts - services contacts from API
 */
export interface ICollectionFormServiceState {
  loading: boolean;
  data: ICollectionFormServiceDataPayload;
  dataShadow: ICollectionFormServiceDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
  loadingContacts: boolean;
  contacts: ICollectionFormServiceContactsDataPayload;
}

/**
 * Fetch Collection Form Facility args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef IFetchCollectionFormFacilityByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormFacilityByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Facility args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ISaveCollectionFormFacilityByCollectionIdArgs
 * @prop {ICollectionFormFacilitySaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormFacilityByCollectionIdArgs {
  data: ICollectionFormFacilitySaveDataPayload;
}

/**
 * Fetch Collection Form Facility Asset Category Facilities args
 * for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs
 * @prop {string} assetCategory - asset category to fetch facilities for
 * @prop {number} rowIdx - index of the row that has been updated
 */
export interface IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs {
  assetCategory: string;
  rowIdx?: number;
}

/**
 * Fetch Collection Form Facility Workflows args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef IFetchCollectionFormFacilityWorkflowsArgs
 * @prop {string} assetCategory - asset category to fetch workflows for
 * @prop {string} facility - facility to fetch workflows for
 * @prop {number} rowIdx - index of the row that has been updated
 */
export interface IFetchCollectionFormFacilityWorkflowsArgs {
  assetCategory: string;
  facility: string;
  rowIdx?: number;
}

/**
 * Collection Form Facility edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityEditFacilityPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited cost
 * @prop {DataTableRowCellValue} value - updated column value
 */
export interface ICollectionFormFacilityEditFacilityPayload {
  colKey: string;
  rowIdx: number;
  value: DataTableRowCellValue;
}

/**
 * Collection Form Facility state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 *
 * @typedef ICollectionFormFacilityState
 * @prop {boolean} loading - facility loading state
 * @prop {ICollectionFormFacilityDataPayload} data - currently loaded facility data
 * @prop {ICollectionFormFacilityDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of facility
 * @prop {boolean} saving - saving state flag of facility data
 * @prop {boolean} edited - facility data has been edited flag
 * @prop {boolean} loadingAssetCategoryFacilities - loading asset category facilities from API
 * @prop {Array<ICollectionFormFacilityAssetCategoryFacilitiesDataPayload>} assetCategoryFacilities - array of facility options for each data row
 * @prop {boolean} loadingWorkflows - loading workflows from API
 * @prop {Array<ICollectionFormFacilityWorkflowsDataPayload>} workflows - array of workflows options for each data row
 */
export interface ICollectionFormFacilityState {
  loading: boolean;
  data: ICollectionFormFacilityDataPayload;
  dataShadow: ICollectionFormFacilityDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
  loadingAssetCategoryFacilities: boolean;
  assetCategoryFacilities: Array<ICollectionFormFacilityAssetCategoryFacilitiesDataPayload>;
  loadingWorkflows: boolean;
  workflows: Array<ICollectionFormFacilityWorkflowsDataPayload>;
}

/**
 * Fetch Collection Form Quote args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef IFetchCollectionFormQuoteByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormQuoteByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Save Collection Form Quote args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ISaveCollectionFormQuoteByCollectionIdArgs
 * @prop {ICollectionFormQuoteSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCollectionFormQuoteByCollectionIdArgs {
  data: ICollectionFormQuoteSaveDataPayload;
}

/**
 * Collection Form Quote edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteEditQuoteConflictPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited cost
 * @prop {DataTableRowCellValue} value - updated column value
 */
export interface ICollectionFormQuoteEditQuoteConflictPayload {
  colKey: string;
  rowIdx: number;
  value: DataTableRowCellValue;
}

/**
 * Collection Form Quote selection action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteSelectionPayload
 * @prop {string} quoteId - quote ID to be acted upon
 */
export interface ICollectionFormQuoteSelectionPayload {
  quoteId: string;
}

/**
 * Collection Form Quote Apply Conflicting Quote action
 * payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteApplyConflictingQuotePayload
 * @prop {number} rowIdx - table row index of quote price to be applied
 * @prop {string} modelId - model for which this apply action updates
 */
export interface ICollectionFormQuoteApplyConflictingQuotePayload {
  rowIdx: number;
  modelId: string;
}

/**
 * Collection Form Quote Conflicts Rows Conflicts data type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteConflictsRowsData
 * @prop {string} modelId - model for which this apply action updates
 */
export interface ICollectionFormQuoteConflictsRowsConflictsData
  extends IQuoteConflictsData {
  modelId: string;
}

/**
 * Collection Form Quote Conflicts Rows Priced Model data type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteConflictsRowsData
 * @prop {string} modelId - model for which this apply action updates
 */
export interface ICollectionFormQuoteConflictsRowsPricedModelData
  extends IQuotePricedModelData {
  modelId: string;
}

/**
 * Collection Form Quote state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 *
 * @typedef ICollectionFormQuoteState
 * @prop {boolean} loading - quote loading state
 * @prop {ICollectionFormQuoteDataPayload} data - original loaded quote data
 * @prop {string} error - current error message state of quote
 * @prop {boolean} saving - saving state flag of quote data
 * @prop {boolean} edited - quote data has been edited flag
 * @prop {Array<ICollectionFormQuoteConflictsRowsConflictsData | ICollectionFormQuoteConflictsRowsPricedModelData>} conflictsRows - manipulated quote data
 * @prop {Array<IQuoteSummaryData>} selectedQuotes - user selected quotes list
 * @prop {Array<IQuoteSummaryData>} availableQuotes - list of available quoites for selection
 */
export interface ICollectionFormQuoteState {
  loading: boolean;
  data: ICollectionFormQuoteDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
  conflictsRows: Array<
    | ICollectionFormQuoteConflictsRowsConflictsData
    | ICollectionFormQuoteConflictsRowsPricedModelData
  >;
  selectedQuotes: Array<IQuoteSummaryData>;
  availableQuotes: Array<IQuoteSummaryData>;
}

/**
 * Fetch Collection Form SOW args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 *
 * @typedef IFetchCollectionFormSOWByCollectionIdArgs
 * @prop {string} collectionId - collection ID to be fetched
 */
export interface IFetchCollectionFormSOWByCollectionIdArgs {
  collectionId: string | (string | null)[];
}

/**
 * Collection Form SOW state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 *
 * @typedef ICollectionFormSOWState
 * @prop {boolean} loading - SOW loading state
 * @prop {ICollectionFormSOWDataPayload} data - original loaded SOW data
 * @prop {string} error - current error message state of SOW
 * @prop {boolean} downloading - downloading SOW flag
 * @prop {string} downloadingError - downloading error state
 * @prop {ICollectionFormSOWValidDataPayload} valid - SOW PDF is valid state
 */
export interface ICollectionFormSOWState {
  loading: boolean;
  data: ICollectionFormSOWDataPayload;
  error?: string;
  downloading: boolean;
  downloadingError?: string;
  valid: ICollectionFormSOWValidDataPayload;
}

/**
 * Save New Asset Category args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.20
 *
 * @typedef ISaveNewAssetCategoryArgs
 * @prop {INewAssetCategoryDataPayload} data - data payload to be sent
 */
export interface ISaveNewAssetCategoryArgs {
  data: INewAssetCategoryDataPayload;
}

/**
 * Permissions definition
 *
 * List of possible permission levels
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof UserPermissionReduxSlice
 *
 * @type {Array<string>}
 */
export const permissions = [
  'Global',
  'Customer',
  'Project',
  'Collection',
] as const;

/**
 * User Permission Level definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof UserPermissionReduxSlice
 *
 * @typedef UserPermissionLevel
 */
export type UserPermissionLevel = (typeof permissions)[number];

/**
 * User Permission Level state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IUserPermissionLevelState
 * @prop {UserPermissionLevel} level - current user permission level
 */
export interface IUserPermissionLevelState {
  level: UserPermissionLevel;
}

/**
 * Notification options definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotificationOptions
 * @prop {SnackbarKey} key - ID key of the notification
 * @prop {AlertColor} variant - notification type, i.e. "error", "success"
 * @prop {any} onClose - callback function invoked when notification is closed
 */
export interface INotificationOptions {
  key: SnackbarKey;
  variant: AlertColor;
  onClose?: any;
}

/**
 * Notification definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotification
 * @prop {string} message - notification message text
 * @prop {boolean} dismissed - has notification been dismissed by user and/or system
 * @prop {INotificationOptions} options - notification options
 */
export interface INotification {
  message: string;
  dismissed: boolean;
  options: INotificationOptions;
}

/**
 * Notification state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotificationState
 * @prop {Array<INotification>} data - list of current notifications held in state
 */
export interface INotificationsState {
  data: Array<INotification>;
}

/**
 * Add Notification action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IAddNotificationPayload
 * @prop {string} message - notification message text
 * @prop {AlertColor} variant - notification type, i.e. "error", "success"
 */
export interface IAddNotificationPayload {
  message: string;
  variant: AlertColor;
}

/**
 * Close Notification action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICloseNotificationPayload
 * @prop {SnackbarKey} key - ID key of the notification
 */
export interface ICloseNotificationPayload {
  key: SnackbarKey;
}

/**
 * Remove Notification action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IRemoveNotificationPayload
 * @prop {SnackbarKey} key - ID key of the notification
 */
export interface IRemoveNotificationPayload {
  key: SnackbarKey;
}

/**
 * Theme state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IThemeState
 * @prop {ThemeType} type - current theme type, i.e. 'light' or 'dark'
 */
export interface IThemeState {
  type: ThemeType;
}

/**
 * Kanban Board state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardState
 *
 * @prop {boolean} loading - schedule loading state
 * @prop {Array<IKanbanBoard>} data - Kanban board datasets
 * @prop {Array<IKanbanBoard>} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of kanban
 * @prop {boolean} saving - saving state flag of kanban data
 * @prop {boolean} edited - kanban data has been edited flag
 */
export interface IKanbanBoardState {
  loading: boolean;
  data: IKanbanBoard;
  dataShadow: IKanbanBoard;
  error?: string;
  saving: boolean;
  edited: boolean;
}

/**
 * Add Kanban Board action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IAddKanbanBoardPayload
 * @prop {string} name - board name
 * @prop {Array<IKanbanBoardColumn>} newColumns - columns to be added to board
 */
export interface IAddKanbanBoardPayload {
  name: string;
  newColumns: Array<IKanbanBoardColumn>;
}

/**
 * Edit Kanban Board action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IEditKanbanBoardPayload
 * @prop {string} name - board name
 * @prop {Array<IKanbanBoardColumn>} newColumns - columns to be updated
 */
export interface IEditKanbanBoardPayload {
  name: string;
  newColumns: Array<IKanbanBoardColumn>;
}

/**
 * Set Kanban Board active payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef ISetKanbanBoardActivePayload
 * @prop {number} index - board index to be set active
 */
export interface ISetKanbanBoardActivePayload {
  index: number;
}

/**
 * Add Kanban Board group payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @typedef IAddKanbanBoardGroupPayload
 * @prop {string} name - group name
 * @prop {sting} status - group status
 * @prop {number} newColIndex - index of added column
 */
export interface IAddKanbanBoardGroupPayload {
  name: string;
  status: string;
  newColIndex: number;
}

/**
 * Edit Kanban Board group payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 *
 * @typedef IEditKanbanBoardGroupPayload
 * @prop {string} name - group name
 * @prop {sting} status - group status
 * @prop {number} newColIndex - index of added group column
 * @prop {number} prevColIndex - previous index of column
 * @prop {number} groupIndex - index of group
 */
export interface IEditKanbanBoardGroupPayload {
  name: string;
  status: string;
  newColIndex: number;
  prevColIndex: number;
  groupIndex: number;
}

/**
 * Add Kanban Board task payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IAddKanbanBoardTaskPayload
 * @prop {string} title - task name
 * @prop {sting} status - task status
 * @prop {number} newColIndex - index of added column
 */
export interface IAddKanbanBoardTaskPayload {
  name: string;
  status: string;
  newColIndex: number;
}

/**
 * Edit Kanban Board task payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IEditKanbanBoardTaskPayload
 * @prop {string} name - task name
 * @prop {sting} status - task status
 * @prop {number} newColIndex - index of added task column
 * @prop {number} prevColIndex - previous index of column
 * @prop {number} taskIndex - index of task
 */
export interface IEditKanbanBoardTaskPayload {
  name: string;
  status: string;
  newColIndex: number;
  prevColIndex: number;
  taskIndex: number;
}

/**
 * Drag Kanban Board task payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IDragKanbanBoardTaskPayload
 * @prop {number} colIndex - original index of column
 * @prop {number} prevColIndex - previous index of column
 * @prop {number} taskIndex - index of task
 */
export interface IDragKanbanBoardTaskPayload {
  colIndex: number;
  prevColIndex: number;
  taskIndex: number;
}

/**
 * Set Kanban Board subtask completed payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef ISetKanbanBoardSubtaskCompletedPayload
 * @prop {number} index - index of subtask
 * @prop {number} colIndex - previous index of column
 * @prop {number} taskIndex - index of parent task
 */
export interface ISetKanbanBoardSubtaskCompletedPayload {
  index: number;
  colIndex: number;
  taskIndex: number;
}

/**
 * Set Kanban Board task status payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef ISetKanbanBoardTaskStatusPayload
 * @prop {string} status - new status of task
 * @prop {number} colIndex - index of subtask
 * @prop {number} newColIndex - previous index of column
 * @prop {number} taskIndex - index of parent task
 */
export interface ISetKanbanBoardTaskStatusPayload {
  status: string;
  colIndex: number;
  newColIndex: number;
  taskIndex: number;
}

/**
 * Set Kanban Board task status payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IDeleteKanbanBoardTaskPayload
 * @prop {number} colIndex - index of task column
 * @prop {number} taskIndex - index of task to be deleted
 */
export interface IDeleteKanbanBoardTaskPayload {
  colIndex: number;
  taskIndex: number;
}

/**
 * Fetch Collections Kanban Board args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IFetchCollectionsKanbanBoardByProjectIdArgs
 * @prop {string | null} projectId - Collections project ID (optional)
 */
export interface IFetchCollectionsKanbanBoardByProjectIdArgs {
  projectId?: string | (string | null)[] | null;
}
