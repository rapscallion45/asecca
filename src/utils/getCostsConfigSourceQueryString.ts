/*
 ** helper function for formatting Costs Config query param string
 */
const getCostsConfigSourceQueryString = (source: string, dataId: string) =>
  `${source.toLowerCase()}=${dataId}`;

export default getCostsConfigSourceQueryString;
