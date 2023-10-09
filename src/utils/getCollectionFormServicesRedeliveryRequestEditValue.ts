import {
  ICollectionFormServicesData,
  ICollectionFormServicesRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct Service Type value with updated Redelivery Request
 * flag for Recycling Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @param {boolean} redeliveryRequestFlag - redelivery value to be updated
 * @returns {ICollectionFormServicesRecycling} - data structure with updated flag
 */
const getCollectionFormServicesRedeliveryRequestEditValue = (
  servicesData: ICollectionFormServicesData,
  redeliveryRequestFlag: boolean
): ICollectionFormServicesRecycling => {
  const recyclingData =
    servicesData.service_type as ICollectionFormServicesRecycling;

  return {
    Recycling: {
      ownership_retention: {
        RetainsOwnership: { redelivery_requested: redeliveryRequestFlag },
      },
      decommissioning_requested:
        recyclingData.Recycling.decommissioning_requested,
    },
  };
};

export default getCollectionFormServicesRedeliveryRequestEditValue;
