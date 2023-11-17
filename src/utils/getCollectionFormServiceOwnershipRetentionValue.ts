import {
  ICollectionFormServiceData,
  ICollectionFormServiceRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Ownership Retention flag
 * for Recycling Service types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @returns {boolean | undefined} - whether flag is set or not, or undefined
 */
const getCollectionFormServiceOwnershipRetentionValue = (
  serviceData: ICollectionFormServiceData
): boolean => {
  /* if the service type is an object, then we have a value to check */
  if (typeof serviceData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in serviceData.service_type) {
      const recyclingData =
        serviceData.service_type as ICollectionFormServiceRecycling;
      return typeof recyclingData.Recycling.ownership_retention === 'object';
    }
  }

  /* ownership retention is an enum, return false */
  return false;
};

export default getCollectionFormServiceOwnershipRetentionValue;
