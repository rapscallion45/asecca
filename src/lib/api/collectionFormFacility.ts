import base64 from 'base-64';
import {
  IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs,
  IFetchCollectionFormFacilityWorkflowsArgs,
} from '@/redux/types';
import { ICollectionFormFacilitySaveDataPayload } from './api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.17
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/facility/api/facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getFacility(collectionId: string | string[]) {
  /* setup GET request options with basic auth */
  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(
        `${STAGING_DB_USERNAME}:${STAGING_DB_PASSWORD}`
      )}`,
    }),
  };

  /* fetch the facility */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/facility/api/facility?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/facility/api/facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormFacilitySaveDataPayload} body - data for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setFacility(
  body: ICollectionFormFacilitySaveDataPayload
) {
  /* setup POST request options with basic auth */
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(
        `${STAGING_DB_USERNAME}:${STAGING_DB_PASSWORD}`
      )}`,
    }),
    body: JSON.stringify(body),
  };

  /* send the facility */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/facility/api/facility`,
    requestOptions
  );
}

/**
 * GET request to Asecca API /collection/facility/api/facilities_for_asset_category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof AseccaAPI
 *
 * @param {IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs} args - args for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getFacilityAssetCategoryFacilities(
  args: IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs
) {
  const { assetCategory } = args;

  /* setup GET request options with basic auth */
  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(
        `${STAGING_DB_USERNAME}:${STAGING_DB_PASSWORD}`
      )}`,
    }),
  };

  /* fetch the asset category facilities */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/facility/api/facilities_for_asset_category?asset_category=${assetCategory}`,
    requestOptions
  );
}

/**
 * GET request to Asecca API /collection/facility/api/workflow_for_facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof AseccaAPI
 *
 * @param {IFetchCollectionFormFacilityWorkflowsArgs} args - args for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getFacilityWorkflows(
  args: IFetchCollectionFormFacilityWorkflowsArgs
) {
  const { assetCategory, facility } = args;

  /* setup GET request options with basic auth */
  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(
        `${STAGING_DB_USERNAME}:${STAGING_DB_PASSWORD}`
      )}`,
    }),
  };

  /* fetch the workflows */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/facility/api/workflow_for_facility?asset_category=${assetCategory}&facility=${facility}`,
    requestOptions
  );
}
