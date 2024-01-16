import {
  CollectionFormServiceType,
  ICollectionFormServiceData,
} from '@/lib/api/api-types';

/**
 * Return the enum value for Collection Form Service Type - this
 * can either be the string value, or the name of the
 * object ('Recycling' or 'Destruction')
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof Utils
 *
 * @param {ICollectionFormServiceData} serviceData - data from collection form
 * @returns {CollectionFormServiceType | undefined} - service type enum string or undefined
 */
const getCollectionFormServiceTypeEnum = (
  serviceData: ICollectionFormServiceData
): CollectionFormServiceType | undefined => {
  /* if the service type is an object, then check which type */
  if (typeof serviceData.service_type === 'object') {
    if ('Recycling' in serviceData.service_type) {
      return 'Recycling';
    }
    if ('Destruction' in serviceData.service_type) {
      return 'Destruction';
    }
    return undefined;
  }
  /* service type is one of the enums, return undefined */
  return serviceData.service_type;
};

export default getCollectionFormServiceTypeEnum;
