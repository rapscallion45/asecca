import {
  CollectionFormServiceType,
  ICollectionFormServiceRecycling,
  ICollectionFormServiceDestruction,
} from '@/lib/api/api-types';

/**
 * Return the correct value for Collection Form Service Type - this
 * can be an enum, or object, depending on the selected dropdown option
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @param {CollectionFormServiceType} type - services type value
 * @returns {CollectionFormServiceType | ICollectionFormServiceRecycling | ICollectionFormServiceDestruction} - service type data
 */
const getCollectionFormServiceTypeValue = (
  type: CollectionFormServiceType
):
  | CollectionFormServiceType
  | ICollectionFormServiceRecycling
  | ICollectionFormServiceDestruction => {
  /* if the service type is one of the objects, then check which type */
  if (type === 'Recycling') {
    return {
      Recycling: {
        decommissioning_requested: false,
        ownership_retention: 'DoesntRetainOwnership',
      },
    } as ICollectionFormServiceRecycling;
  }
  if (type === 'Destruction') {
    return {
      Destruction: {
        decommissioning_requested: false,
      },
    } as ICollectionFormServiceDestruction;
  }
  /* service type is one of the enums */
  return type;
};

export default getCollectionFormServiceTypeValue;
