import {
  ICollectionFormServicesData,
  ICollectionFormServicesDestruction,
  ICollectionFormServicesRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Decommissioning Requested flag
 * for Recycling or Destruction Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @returns {boolean | undefined} - whether flag is set or not, or undefined
 */
const getCollectionFormServicesDecommissionRequestValue = (
  servicesData: ICollectionFormServicesData
): boolean => {
  /* if the service type is an object, then we have a value to check */
  if (typeof servicesData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in servicesData.service_type) {
      const recyclingData =
        servicesData.service_type as ICollectionFormServicesRecycling;
      return recyclingData.Recycling.decommissioning_requested;
    }
    /* Destruction object processing */
    if ('Destruction' in servicesData.service_type) {
      const destructionData =
        servicesData.service_type as ICollectionFormServicesDestruction;
      return destructionData.Destruction.decommissioning_requested;
    }
  }

  /* service type is one of the enums, return undefined */
  return false;
};

export default getCollectionFormServicesDecommissionRequestValue;
