import {
  CostsConfigCostSource,
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
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Utils
 *
 * @param {CostsConfigCostSource} source - costs config source, i.e. 'Project'
 * @param {string | Array<string | null>} dataId - ID number of the costs config
 * @param {Array<ICostsConfigData> | undefined} data - costs config data to process
 * @returns {ICostsConfigSaveDataPayload} - resulting payload data
 */
const getCostsConfigPostData = (
  source: CostsConfigCostSource,
  dataId: string | Array<string | null>,
  data: Array<ICostsConfigData> | undefined
): ICostsConfigSaveDataPayload => {
  /* sanity check input, return empties if incorrect */
  if (!source || !dataId || !data) return { costs: [], selection: {} };

  /* get costs requests - cycle through data and pull out required cols */
  const costs: Array<ICostsConfigSaveDataCosts> = data
    /* filter out any rows where user has entered null */
    .filter(
      (dataRow: ICostsConfigData) =>
        dataRow[`${source.toLowerCase()}_charge` as keyof ICostsConfigData] !==
        null
    )
    /* map required fields for post request */
    .map((dataRow: ICostsConfigData) => ({
      application: dataRow.application,
      line_type: dataRow.line_type,
      name: dataRow.name,
      charge:
        dataRow[`${source.toLowerCase()}_charge` as keyof ICostsConfigData] ||
        null,
    }));

  /* get the selection param */
  const selection: ICostsConfigSaveDataSelection = {
    [source.toLowerCase() as keyof ICostsConfigSaveDataSelection]:
      dataId as string,
  };

  return { costs, selection };
};

export default getCostsConfigPostData;
