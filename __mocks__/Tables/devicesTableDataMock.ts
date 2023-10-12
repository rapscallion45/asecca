import { IDevicesTableDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /table/api/devices
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */
const devicesTableDataMock: IDevicesTableDataPayload = {
  devices: [
    {
      collection_id: '66135000015737072',
      collection_name: 'Coty',
      customer: 'Coty',
      destroyed: false,
      diagnostics_grade: 'A',
      fmip_status: 'Locked',
      frp_status: 'Untested',
      imei: '367824682856',
      in_stock: false,
      logged_ts: '2022-4-5T09:30',
      manufacturer: 'Apple',
      mdm_status: 'Locked',
      model: 'iPhone 6s GSM',
      overall_grade: '3',
      project: 'Test Project',
      quarantined: false,
      serial: '1234985603985415',
      smash_test_grade: 'B',
      to_be_destroyed: false,
      uid: '342301275109457',
    },
    {
      collection_id: '66135000015737084',
      collection_name: 'Coty',
      customer: 'Coty',
      destroyed: true,
      diagnostics_grade: 'D',
      fmip_status: 'Locked',
      frp_status: 'Untested',
      imei: '367824682856',
      in_stock: false,
      logged_ts: '2022-4-5T10:30',
      manufacturer: 'Apple',
      mdm_status: 'Locked',
      model: 'iPhone 6s GSM',
      overall_grade: '3',
      project: 'Test Project 2',
      quarantined: false,
      serial: '1234985603932415',
      smash_test_grade: 'B',
      to_be_destroyed: false,
      uid: '342301275112457',
    },
  ],
};

export default devicesTableDataMock;
