import {
  ICostsConfigData,
  ICostsConfigSaveDataCosts,
  ICostsConfigSaveDataPayload,
  ICostsConfigSaveDataSelection,
} from '@/lib/api/api-types';

/**
 * Returns formatted data for saving Costs Config to API, from passed Costs Config
 * data block. The passed data is cycled, pulling the required fields for
 * the POST request.
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param source - can be any of 'collection', 'project', 'customer' or 'global'
 * @param dataId - ID number of the costs configuration
 * @param data - costs config data to process
 * @returns {ICostsConfigSaveDataPayload} - resulting payload data
 * @type {(source : string), (dataId : string | (string | null)[]), (data : Array<ICostsConfigData> | undefined)}
 */
const getCostsConfigPostData = (
  source: string,
  dataId: string | (string | null)[],
  data: Array<ICostsConfigData> | undefined
): ICostsConfigSaveDataPayload => {
  /** sanity check input, return empties if incorrect */
  if (!source || !dataId || !data) return { costs: [], selection: {} };

  /** get costs requests - cycle through data and pull out required cols */
  const costs: Array<ICostsConfigSaveDataCosts> = data
    /** filter out any rows where user has entered null */
    .filter(
      (dataRow: ICostsConfigData) =>
        dataRow[`${source.toLowerCase()}_charge` as keyof ICostsConfigData] !==
        null
    )
    /** map required fields for post request */
    .map((dataRow: ICostsConfigData) => ({
      application: dataRow.application,
      line_type: dataRow.line_type,
      name: dataRow.name,
      charge:
        dataRow[`${source.toLowerCase()}_charge` as keyof ICostsConfigData] ||
        null,
    }));

  /** get the selection param */
  const selection: ICostsConfigSaveDataSelection = {
    [source.toLowerCase() as keyof ICostsConfigSaveDataSelection]:
      dataId as string,
  };

  return { costs, selection };
};

export default getCostsConfigPostData;
