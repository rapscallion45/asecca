import {
  CollectionFormServicesType,
  ICollectionFormServicesRecycling,
  ICollectionFormServicesDestruction,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Collection Form Service Type - this
 * can be an enum, or object, depending on the selected dropdown option
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 *
 * @param {CollectionFormServicesType} type - services type value
 * @returns {CollectionFormServicesType | ICollectionFormServicesRecycling | ICollectionFormServicesDestruction} - service type data
 */
const getCollectionFormServicesTypeValue = (
  type: CollectionFormServicesType
):
  | CollectionFormServicesType
  | ICollectionFormServicesRecycling
  | ICollectionFormServicesDestruction => {
  /* if the service type is one of the objects, then check which type */
  if (type === 'Recycling') {
    return {
      Recycling: {
        decommissioning_requested: false,
        ownership_retention: 'DoesntRetainOwnership',
      },
    } as ICollectionFormServicesRecycling;
  }
  if (type === 'Destruction') {
    return {
      Destruction: {
        decommissioning_requested: false,
      },
    } as ICollectionFormServicesDestruction;
  }
  /* service type is one of the enums */
  return type;
};

export default getCollectionFormServicesTypeValue;
