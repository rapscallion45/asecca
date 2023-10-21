import {
  ICollectionFormCostsSaveDataPayload,
  ICollectionFormFacilitySaveDataPayload,
  ICollectionFormItinerarySaveDataPayload,
  ICollectionFormLogisticsSaveDataPayload,
  ICollectionFormScheduleSaveDataPayload,
  ICollectionFormServicesSaveDataPayload,
  ICollectionFormQuoteSaveDataPayload,
  ICollectionFormNewContactSaveDataPayload,
} from '@/lib/api/api-types';
import {
  IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs,
  IFetchCollectionFormFacilityWorkflowsArgs,
} from '@/redux/types';

/**
 * API services for Collection Form
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * GET request to /api/collection/costs/api/costs
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getCosts(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/costs/api/costs?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/costs/api/costs
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @param {ICollectionFormCostsSaveDataPayload} body - Costs data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setCosts(body: ICollectionFormCostsSaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/costs/api/costs`, requestOptions);
}

/**
 * GET request to /api/collection/logistics/api/logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getLogistics(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/logistics/api/logistics?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/logistics/api/logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @param {ICollectionFormLogisticsSaveDataPayload} body - Logistics data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setLogistics(body: ICollectionFormLogisticsSaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/logistics/api/logistics`, requestOptions);
}

/**
 * GET request to /api/collection/logistics/api/compatible_facilities_for_logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getLogisticsTypes() {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/logistics/api/compatible_facilities_for_logistics`,
    requestOptions
  );
}

/**
 * GET request to /api/collection/schedule/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getSchedule(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/schedule/api/get?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/schedule/api/set
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Services
 *
 * @param {ICollectionFormScheduleSaveDataPayload} body - Schedule data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setSchedule(body: ICollectionFormScheduleSaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/schedule/api/set`, requestOptions);
}

/**
 * GET request to /api/collection/services/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getServices(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/services/api/get?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/services/api/set
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof Services
 *
 * @param {ICollectionFormServicesSaveDataPayload} body - Schedule data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setServices(body: ICollectionFormServicesSaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/services/api/set`, requestOptions);
}

/**
 * GET request to /api/collection/service/api/contacts
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Services
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getServicesContacts() {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/service/api/contacts`, requestOptions);
}

/**
 * GET request to /api/collection/itinerary/api/itinerary
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getItinerary(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/itinerary/api/itinerary?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/itinerary/api/itinerary
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Services
 *
 * @param {ICollectionFormItinerarySaveDataPayload} body - Itinerary data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setItinerary(body: ICollectionFormItinerarySaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/itinerary/api/itinerary`, requestOptions);
}

/**
 * GET request to /api/collection/enumerations/api/asset_category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Services
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getItineraryAssetCategories() {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/enumerations/api/asset_category`,
    requestOptions
  );
}

/**
 * GET request to /api/collection/facility/api/facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getFacility(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/facility/api/facility?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/facility/api/facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof Services
 *
 * @param {ICollectionFormFacilitySaveDataPayload} body - Itinerary data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setFacility(body: ICollectionFormFacilitySaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/facility/api/facility`, requestOptions);
}

/**
 * GET request to /api/collection/facility/api/facilities_for_asset_category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof Services
 *
 * @param {IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs} args - args for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getFacilityAssetCategoryFacilities(
  args: IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs
) {
  const { assetCategory } = args;

  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/facility/api/facilities_for_asset_category?asset_category=${assetCategory}`,
    requestOptions
  );
}

/**
 * GET request to /api/collection/facility/api/workflow_for_facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof Services
 *
 * @param {IFetchCollectionFormFacilityWorkflowsArgs} args - args for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getFacilityWorkflows(
  args: IFetchCollectionFormFacilityWorkflowsArgs
) {
  const { assetCategory, facility } = args;

  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/facility/api/workflow_for_facility?asset_category=${assetCategory}&facility=${facility}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/contact/api/create
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof Services
 *
 * @param {ICollectionFormNewContactSaveDataPayload} body - Contact data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function createNewContact(
  body: ICollectionFormNewContactSaveDataPayload
) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/contact/api/create`, requestOptions);
}

/**
 * GET request to /api/collection/quote/api/quote
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof Services
 *
 * @param {string | Array<(string | null)>} collectionId - ID of the collection
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getQuote(collectionId: string | Array<string | null>) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/quote/api/quote?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to /api/collection/quote/api/quote
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof Services
 *
 * @param {ICollectionFormFacilitySaveDataPayload} body - Itinerary data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setQuote(body: ICollectionFormQuoteSaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/quote/api/quote`, requestOptions);
}

const collectionFormService = {
  getCosts,
  setCosts,
  getLogistics,
  setLogistics,
  getLogisticsTypes,
  getSchedule,
  setSchedule,
  getServices,
  setServices,
  getServicesContacts,
  getItinerary,
  setItinerary,
  getItineraryAssetCategories,
  getFacility,
  setFacility,
  getFacilityAssetCategoryFacilities,
  getFacilityWorkflows,
  getQuote,
  setQuote,
  createNewContact,
};

export default collectionFormService;
