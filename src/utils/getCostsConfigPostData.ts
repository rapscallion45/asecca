import {
  ICostsConfigData,
  ICostsConfigSaveDataCosts,
  ICostsConfigSaveDataPayload,
  ICostsConfigSaveDataSelection,
} from '@/api-types';
import {
  CostsConfigRowCustom,
  ICostsConfigRowTypical,
} from '../components/DataTable/types';

/* selection ID is in the form of a decimal number */
const SELECTION_ID_PARAM_RADIX_VAL = 10;

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
    (dataRow: ICostsConfigRowTypical | CostsConfigRowCustom) => ({
      application: dataRow.application,
      line_type: dataRow.line_type,
      name: dataRow.name,
      charge: dataRow[`${source.toLowerCase()}_charge`],
    })
  );

  /* get the selection param - ID must be parsed to number! */
  const selection: ICostsConfigSaveDataSelection = {
    [source.toLowerCase()]: parseInt(
      dataId as string,
      SELECTION_ID_PARAM_RADIX_VAL
    ),
  };

  return { costs, selection };
};

export default getCostsConfigPostData;
