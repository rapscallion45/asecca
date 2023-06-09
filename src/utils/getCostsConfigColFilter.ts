import { UserPermissionLevel } from '@/redux/types';

/**
 * Return list of columns to be filtered out of Config Costs
 * data table according to passed permission level
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Utils
 *
 * @param {UserPermissionLevel} permissionLevel - permission level to filter columns for
 * @returns {Array<UserPermissionLevel | null>} - filtered columns for passed permission level
 */
const getCostsConfigColFilterList = (
  permissionLevel: UserPermissionLevel
): Array<UserPermissionLevel | null> => {
  /* return columns to be filtered depending on passed permission level */
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
