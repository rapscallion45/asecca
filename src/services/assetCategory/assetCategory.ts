/**
 * API services for Asset Category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 */

import { INewAssetCategoryDataPayload } from '@/lib/api/api-types';

/**
 * GET request to /api/collection/asset_category/api/facilities
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 * @memberof Services
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getAssetCategoryFacilities() {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(`/api/collection/asset_category/api/facilities`, requestOptions);
}

/**
 * POST request to /api/collection/asset_category/api/new_asset_category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 * @memberof Services
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setNewAssetCategory(body: INewAssetCategoryDataPayload) {
  /* configure GET header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(
    `/api/collection/asset_category/api/new_asset_category`,
    requestOptions
  );
}

const assetCategoryService = {
  getAssetCategoryFacilities,
  setNewAssetCategory,
};

export default assetCategoryService;
