import {
  CollectionFormServicesType,
  ICollectionFormServicesData,
} from '@/lib/api/api-types';

/**
 * Return the enum value for Collection Form Services Type - this
 * can either be the string value, or the name of the
 * object ('Recycling' or 'Destruction')
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @param {ICollectionFormServicesData} serviceData - data from collection form
 * @returns {string | undefined} - service type enum string or undefined
 */
const getCollectionFormServicesTypeEnum = (
  servicesData: ICollectionFormServicesData
): CollectionFormServicesType | undefined => {
  /* if the service type is an object, then check which type */
  if (typeof servicesData.service_type === 'object') {
    if ('Recycling' in servicesData.service_type) {
      return 'Recycling';
    }
    if ('Destruction' in servicesData.service_type) {
      return 'Destruction';
    }
    return undefined;
  }
  /* service type is one of the enums, return undefined */
  return servicesData.service_type;
};

export default getCollectionFormServicesTypeEnum;
