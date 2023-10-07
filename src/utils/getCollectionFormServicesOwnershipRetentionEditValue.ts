import {
  ICollectionFormServicesData,
  ICollectionFormServicesRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct Service Type value with updated Ownership Retention
 * flag for Recycling Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @param {boolean} ownershipRetentionFlag - decommission value to be updated
 * @returns {ICollectionFormServicesOwnershipRetention | CollectionFormServicesDoesntRetainOwnership} - data structure with updated flag
 */
const getCollectionFormServicesOwnershipRetentionEditValue = (
  servicesData: ICollectionFormServicesData,
  ownershipRetentionFlag: boolean
): string | ICollectionFormServicesRecycling => {
  /* if the service type is an object, then we have a value to check */
  if (typeof servicesData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in servicesData.service_type) {
      return {
        Recycling: {
          ownership_retention: ownershipRetentionFlag
            ? { RetainsOwnership: { redelivery_requested: false } }
            : 'DoesntRetainOwnership',
          decommissioning_requested:
            servicesData.service_type.Recycling.decommissioning_requested,
        },
      };
    }
  }

  /* service type is not the correct object, return Doesn't Retain */
  return 'DoesntRetainOwnership';
};

export default getCollectionFormServicesOwnershipRetentionEditValue;
