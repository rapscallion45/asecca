import { ICollectionFormCostsSaveDataPayload } from '@/lib/api/api-types';

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
 * POST request to /collection/costs/api/costs
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

const collectionFormService = {
  getCosts,
  setCosts,
};

export default collectionFormService;
