import {
  IQuoteModelPriceData,
  ICollectionFormQuoteData,
  ICollectionFormQuoteConflictsData,
  ICollectionFormQuoteSaveDataPayload,
} from '@/lib/api/api-types';

/**
 * Returns formatted data for saving Collection Form Quote to API, from passed
 * Collection Form Quote data block. The passed data is cycled, pulling the
 * required fields for the POST request.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof Utils
 *
 * @param {string | Array<string | null>} collectionId - ID of the collection to save quote for
 * @param {string} expires - expiry date of this quote config
 * @param {Array<ICollectionFormQuoteData>} data - quote data to process
 * @returns {ICollectionFormQuoteSaveDataPayload} - resulting payload data
 */
const getCollectionFormQuotePostData = (
  collectionId: string | Array<string | null>,
  expires: string,
  data: ICollectionFormQuoteData
): ICollectionFormQuoteSaveDataPayload => {
  /* sanity check input, return empties if incorrect */
  if (!collectionId || !data || !expires)
    return { collection: '', expires: '', models: [] };

  /* get quote conflicts - cycle through data and pull out required cols */
  const models: Array<IQuoteModelPriceData> = data.conflicts
    /* map required fields for post request */
    .map((conflict: ICollectionFormQuoteConflictsData) => ({
      id: conflict.model.model.id,
      prices: conflict.model.prices,
    }));

  return { collection: collectionId, expires, models };
};

export default getCollectionFormQuotePostData;
