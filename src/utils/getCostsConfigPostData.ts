import {
  ICostsConfigSaveDataCosts,
  ICostsConfigSaveDataPayload,
  ICostsConfigSaveDataSelection,
} from '@/api-types';

/*
 ** returns formatted and packed data for saving costs config to API
 */
const getCostsConfigPostData = (
  source: string,
  dataId: string | (string | null)[],
  data: any
): ICostsConfigSaveDataPayload => {
  const costs: Array<ICostsConfigSaveDataCosts> = data;
  const selection: ICostsConfigSaveDataSelection = {
    [source.toLowerCase()]: dataId,
  };

  return { costs, selection };
};
export default getCostsConfigPostData;
