import {
  ICollectionFormServiceData,
  ICollectionFormServiceRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct Service Type value with updated Redelivery Request
 * flag for Recycling Service types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Utils
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @param {boolean} redeliveryRequestFlag - redelivery value to be updated
 * @returns {ICollectionFormServiceRecycling} - data structure with updated flag
 */
const getCollectionFormServiceRedeliveryRequestEditValue = (
  serviceData: ICollectionFormServiceData,
  redeliveryRequestFlag: boolean
): ICollectionFormServiceRecycling => {
  const recyclingData =
    serviceData.service_type as ICollectionFormServiceRecycling;

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

export default getCollectionFormServiceRedeliveryRequestEditValue;
