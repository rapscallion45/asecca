import {
  ICollectionFormServicesData,
  ICollectionFormServicesRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Ownership Retention flag
 * for Recycling Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @returns {boolean | undefined} - whether flag is set or not, or undefined
 */
const getCollectionFormServicesOwnershipRetentionValue = (
  servicesData: ICollectionFormServicesData
): boolean => {
  /* if the service type is an object, then we have a value to check */
  if (typeof servicesData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in servicesData.service_type) {
      const recyclingData =
        servicesData.service_type as ICollectionFormServicesRecycling;
      return typeof recyclingData.Recycling.ownership_retention === 'object';
    }
  }

  /* ownership retention is an enum, return false */
  return false;
};

export default getCollectionFormServicesOwnershipRetentionValue;
