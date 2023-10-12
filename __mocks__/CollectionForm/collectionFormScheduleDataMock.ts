import { ICollectionFormScheduleDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/schedule/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
const collectionFormScheduleDataMock: ICollectionFormScheduleDataPayload = {
  preferred_date: '2023/09/08',
  preferred_time: '09:30',
  notes: 'Approximately 200+ tablets (boxed)',
};

export default collectionFormScheduleDataMock;
