import {
  ICostsConfigData,
  ICostsConfigSaveDataCosts,
  ICostsConfigSaveDataPayload,
  ICostsConfigSaveDataSelection,
} from '@/lib/api/api-types';

/*
 ** returns formatted data for saving Costs Config to API
 */
const getCostsConfigPostData = (
  source: string,
  dataId: string | (string | null)[],
  data: Array<ICostsConfigData> | undefined
): ICostsConfigSaveDataPayload => {
  /* sanity check input, return empties if incorrect */
  if (!source || !dataId || !data) return { costs: [], selection: {} };

  /* get costs requests - cycle through data and pull out required cols */
  const costs: Array<ICostsConfigSaveDataCosts> = data.map(
    (dataRow: ICostsConfigData) => ({
      application: dataRow.application,
      line_type: dataRow.line_type,
      name: dataRow.name,
      charge:
        dataRow[`${source.toLowerCase()}_charge` as keyof ICostsConfigData] ||
        null,
    })
  );

  /* get the selection param */
  const selection: ICostsConfigSaveDataSelection = {
    [source.toLowerCase() as keyof ICostsConfigSaveDataSelection]:
      dataId as string,
  };

  return { costs, selection };
};

export default getCostsConfigPostData;
