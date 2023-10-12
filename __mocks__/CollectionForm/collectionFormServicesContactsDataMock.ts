import { ICollectionFormServicesContactsDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/service/api/contacts
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 */
const collectionFormServicesContactsDataMock: ICollectionFormServicesContactsDataPayload =
  {
    contacts_list: ['Contact One', 'Contact Two'],
  };

export default collectionFormServicesContactsDataMock;
