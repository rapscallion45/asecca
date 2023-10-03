import {
  ICollectionFormCostsSaveDataPayload,
  ICollectionFormLogisticsSaveDataPayload,
} from '@/lib/api/api-types';

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

const collectionFormService = {
  getCosts,
  setCosts,
  getLogistics,
  setLogistics,
  getLogisticsTypes,
};

export default collectionFormService;
