import {
  ICollectionFormServiceData,
  ICollectionFormServiceDestruction,
  ICollectionFormServiceRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct Service Type value with updated Decommissioning Requested
 * flag for Recycling or Destruction Service types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Utils
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @param {boolean} decommissionRequestFlag - decommission value to be updated
 * @returns {ICollectionFormServiceRecycling | ICollectionFormServiceDestructionData} - data structure with updated flag
 */
const getCollectionFormServiceDecommissionRequestEditValue = (
  serviceData: ICollectionFormServiceData,
  decommissionRequestFlag: boolean
):
  | string
  | ICollectionFormServiceRecycling
  | ICollectionFormServiceDestruction => {
  /* if the service type is an object, then we have a value to check */
  if (typeof serviceData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in serviceData.service_type) {
      return {
        Recycling: {
          ownership_retention:
            serviceData.service_type.Recycling.ownership_retention,
          decommissioning_requested: decommissionRequestFlag,
        },
      };
    }
    /* Destruction object processing */
    if ('Destruction' in serviceData.service_type) {
      return {
        Destruction: {
          decommissioning_requested: decommissionRequestFlag,
        },
      };
    }
  }

  /* service type is not the correct object, just return it as is */
  return serviceData.service_type;
};

export default getCollectionFormServiceDecommissionRequestEditValue;
