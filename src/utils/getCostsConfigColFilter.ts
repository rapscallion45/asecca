/**
 * Return list of columns to be filtered out of Config Costs
 * data table according to passed permission level
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const getCostsConfigColFilterList = (
  permissionLevel: string
): Array<string | null> => {
  /** filter out columns depending on passed permission level */
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
export default getCostsConfigColFilterList;
