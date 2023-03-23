/*
 ** return list of columns to be filtered out of Config Costs
 ** data table according to passed permission level
 */
const getConfigCostsColFilterList = (permissionLevel: string) => {
  switch (permissionLevel) {
    case 'Collection':
      return [];
    case 'Project':
      return ['Collection'];
    case 'Customer':
      return ['Project', 'Collection'];
    case 'Global':
    default:
      return ['Customer', 'Project', 'Collection'];
  }
};
export default getConfigCostsColFilterList;
