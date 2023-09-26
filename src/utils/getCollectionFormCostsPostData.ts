import {
  ICollectionFormCostsData,
  ICollectionFormCostsSaveDataCosts,
  ICollectionFormCostsSaveDataPayload,
} from '@/lib/api/api-types';

/**
 * Returns formatted data for saving Collection Form Costs to API, from passed
 * Collection Form Costs data block. The passed data is cycled, pulling the
 * required fields for the POST request, omitting rows that do not have a
 * "collection_charge" value entered.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof Utils
 *
 * @param {string | Array<string | null>} dataId - collection ID for costs
 * @param {Array<ICostsConfigData> | undefined} data - costs data to process
 * @returns {ICollectionFormCostsSaveDataPayload} - resulting payload data
 */
const getCollectionFormCostsPostData = (
  dataId: string | Array<string | null>,
  data: Array<ICollectionFormCostsData> | undefined
): ICollectionFormCostsSaveDataPayload => {
  /* sanity check input, return empties if incorrect */
  if (!dataId || !data) return { rows: [] };

  /* get costs requests - cycle through data and pull out required cols */
  const rows: Array<ICollectionFormCostsSaveDataCosts> = data
    /* filter out any rows where user has entered null for collection charge */
    .filter(
      (dataRow: ICollectionFormCostsData) =>
        dataRow[`collection_charge` as keyof ICollectionFormCostsData] !== null
    )
    /* map required fields for post request */
    .map((dataRow: ICollectionFormCostsData) => ({
      chargeable: dataRow.chargeable,
      charge:
        dataRow[`collection_charge` as keyof ICollectionFormCostsData] || null,
    }));

  return { rows };
};

export default getCollectionFormCostsPostData;
