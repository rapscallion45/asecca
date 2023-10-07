import {
  ICollectionFormServicesData,
  ICollectionFormServicesDestruction,
  ICollectionFormServicesRecycling,
} from '@/lib/api/api-types';

/**
 * Return the correct Service Type value with updated Decommissioning Requested
 * flag for Recycling or Destruction Services types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @param {boolean} decommissionRequestFlag - decommission value to be updated
 * @returns {ICollectionFormServicesRecycling | ICollectionFormServicesDestructionData} - data structure with updated flag
 */
const getCollectionFormServicesDecommissionRequestEditValue = (
  servicesData: ICollectionFormServicesData,
  decommissionRequestFlag: boolean
):
  | string
  | ICollectionFormServicesRecycling
  | ICollectionFormServicesDestruction => {
  /* if the service type is an object, then we have a value to check */
  if (typeof servicesData.service_type === 'object') {
    /* Recycling object processing */
    if ('Recycling' in servicesData.service_type) {
      return {
        Recycling: {
          ownership_retention:
            servicesData.service_type.Recycling.ownership_retention,
          decommissioning_requested: decommissionRequestFlag,
        },
      };
    }
    /* Destruction object processing */
    if ('Destruction' in servicesData.service_type) {
      return {
        Destruction: {
          decommissioning_requested: decommissionRequestFlag,
        },
      };
    }
  }

  /* service type is not the correct object, just return it as is */
  return servicesData.service_type;
};

export default getCollectionFormServicesDecommissionRequestEditValue;
