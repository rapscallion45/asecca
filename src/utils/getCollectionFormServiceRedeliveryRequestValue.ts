import {
  ICollectionFormServiceData,
  ICollectionFormServiceOwnershipRetention,
  ICollectionFormServiceRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Redelivery Request flag
 * for Recycling Service types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @param {boolean} customerRetainsOwnershipFlag - redelivery flag state
 * @returns {boolean} - whether redelivery flag is set or not
 */
const getCollectionFormServiceRedeliveryRequestValue = (
  serviceData: ICollectionFormServiceData,
  customerRetainsOwnershipFlag: boolean
): boolean => {
  /* if customer retention flag not set, no redelivery needed */
  if (customerRetainsOwnershipFlag) {
    /* if the service type is an object, then we have a value to check */
    if (typeof serviceData.service_type === 'object') {
      /* Recycling object processing */
      if ('Recycling' in serviceData.service_type) {
        const recyclingData =
          serviceData.service_type as ICollectionFormServiceRecycling;
        /* ensure ownership retention flag is object type */
        if (typeof recyclingData.Recycling.ownership_retention === 'object') {
          const ownershipRetention = serviceData.service_type.Recycling
            .ownership_retention as ICollectionFormServiceOwnershipRetention;
          return ownershipRetention.RetainsOwnership.redelivery_requested;
        }
      }
    }
  }

  /* ownership retention is an enum, return false */
  return false;
};

export default getCollectionFormServiceRedeliveryRequestValue;
