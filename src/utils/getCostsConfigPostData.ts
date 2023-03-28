/*
 ** returns formatted and packed data for saving to costs config to API
 */
const getCostsConfigPostData = (
  source: string,
  dataId: string | (string | null)[],
  data: any
) => {
  const costs: any = data;
  const selection: any = { [source.toLocaleLowerCase()]: dataId };

  return { costs, selection };
};
export default getCostsConfigPostData;
