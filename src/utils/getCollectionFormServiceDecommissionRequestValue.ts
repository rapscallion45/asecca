import {
  ICollectionFormServiceData,
  ICollectionFormServiceDestruction,
  ICollectionFormServiceRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Decommissioning Requested flag
 * for Recycling or Destruction Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @returns {boolean | undefined} - whether flag is set or not, or undefined
 */
const getCollectionFormServiceDecommissionRequestValue = (
  serviceData: ICollectionFormServiceData
): boolean => {
  /* if the service type is an object, then we have a value to check */
  if (typeof serviceData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in serviceData.service_type) {
      const recyclingData =
        serviceData.service_type as ICollectionFormServiceRecycling;
      return recyclingData.Recycling.decommissioning_requested;
    }
    /* Destruction object processing */
    if ('Destruction' in serviceData.service_type) {
      const destructionData =
        serviceData.service_type as ICollectionFormServiceDestruction;
      return destructionData.Destruction.decommissioning_requested;
    }
  }

  /* service type is one of the enums, return undefined */
  return false;
};

export default getCollectionFormServiceDecommissionRequestValue;
