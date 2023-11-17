import {
  ICollectionFormServiceData,
  ICollectionFormServiceRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct Service Type value with updated Ownership Retention
 * flag for Recycling Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @param {boolean} ownershipRetentionFlag - decommission value to be updated
 * @returns {string | ICollectionFormServiceRecycling} - data structure or string
 */
const getCollectionFormServiceOwnershipRetentionEditValue = (
  serviceData: ICollectionFormServiceData,
  ownershipRetentionFlag: boolean
): string | ICollectionFormServiceRecycling => {
  /* if the service type is an object, then we have a value to check */
  if (typeof serviceData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in serviceData.service_type) {
      return {
        Recycling: {
          ownership_retention: ownershipRetentionFlag
            ? { RetainsOwnership: { redelivery_requested: false } }
            : 'DoesntRetainOwnership',
          decommissioning_requested:
            serviceData.service_type.Recycling.decommissioning_requested,
        },
      };
    }
  }

  /* service type is not the correct object, return Doesn't Retain */
  return 'DoesntRetainOwnership';
};

export default getCollectionFormServiceOwnershipRetentionEditValue;
