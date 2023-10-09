import {
  ICollectionFormServicesData,
  ICollectionFormServicesOwnershipRetention,
  ICollectionFormServicesRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Redelivery Request flag
 * for Recycling Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @param {boolean} customerRetainsOwnershipFlag - redelivery flag state
 * @returns {boolean | undefined} - whether flag is set or not, or undefined
 */
const getCollectionFormServicesRedeliveryRequestValue = (
  servicesData: ICollectionFormServicesData,
  customerRetainsOwnershipFlag: boolean
): boolean => {
  /* if customer retention flag not set, no redelivery needed */
  if (customerRetainsOwnershipFlag) {
    /* if the service type is an object, then we have a value to check */
    if (typeof servicesData.service_type === 'object') {
      /* Recycling object processing */
      if ('Recycling' in servicesData.service_type) {
        const recyclingData =
          servicesData.service_type as ICollectionFormServicesRecycling;
        /* ensure ownership retention flag is object type */
        if (typeof recyclingData.Recycling.ownership_retention === 'object') {
          const ownershipRetention = servicesData.service_type.Recycling
            .ownership_retention as ICollectionFormServicesOwnershipRetention;
          return ownershipRetention.RetainsOwnership.redelivery_requested;
        }
      }
    }
  }

  /* ownership retention is an enum, return false */
  return false;
};

export default getCollectionFormServicesRedeliveryRequestValue;
