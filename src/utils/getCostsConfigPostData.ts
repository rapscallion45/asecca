import {
  CostsConfigSaveDataCosts,
  CostsConfigSaveDataSelection,
} from '@/api-types';

/*
 ** returns formatted and packed data for saving to costs config to API
 */
const getCostsConfigPostData = (
  source: string,
  dataId: string | (string | null)[],
  data: any
) => {
  const costs: Array<CostsConfigSaveDataCosts> = data;
  const selection: CostsConfigSaveDataSelection = {
    [source.toLowerCase()]: dataId,
  };

  return { costs, selection };
};
export default getCostsConfigPostData;
