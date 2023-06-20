import { IKanbanBoardCollectionsDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection_kanban/api/collections
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 */
const kanbanCollectionsDataMock: IKanbanBoardCollectionsDataPayload = {
  collections: {
    name: 'Collections',
    columns: [
      {
        name: 'InboundOrderCreated',
        tasks: [
          {
            status: 'InboundOrderCreated',
            id: '66135000022526055',
            name: 'GB Group Postal Packs - 213',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022526047',
            name: 'GB Group Postal Packs - 212',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022526039',
            name: 'GB Group Postal Packs - 211',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022526031',
            name: 'GB Group Postal Packs - 210',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022526023',
            name: 'GB Group Postal Packs - 209',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022526015',
            name: 'GB Group Postal Packs - 208',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022526007',
            name: 'GB Group Postal Packs - 207',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022520999',
            name: 'GB Group Postal Packs - 206',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022520991',
            name: 'GB Group Postal Packs - 205',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022520983',
            name: 'GB Group Postal Packs - 204',
          },
          {
            status: 'Booked',
            id: '66135000022327006',
            name: 'Mercedes F1 June 2023 - MBGP',
          },
          {
            status: 'Booked',
            id: '66135000022345403',
            name: 'JD Decom & Re-Delivery 239 JD Denton',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022436313',
            name: 'Lloyds 1 x Phone Box collection Peterborough',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022436322',
            name: 'DSV Netherlands collection - Just Eat Holding',
          },
          {
            status: 'InboundOrderCreated',
            id: '66135000022453104',
            name: 'Beam Suntory Mobile collections - Glasgow',
          },
          {
            status: 'Delivered',
            id: '66135000022483006',
            name: 'Fujitsu 5 Box collection - June 2023',
          },
          {
            status: 'Delivered',
            id: '66135000022341002',
            name: 'x20 A33 Stock',
          },
          {
            status: 'Booked',
            id: '66135000022326060',
            name: 'TP Return for 66135000022288346',
          },
          {
            status: 'Booked',
            id: '66135000022326056',
            name: 'TP Return for 66135000022326033',
          },
          {
            status: 'Booked',
            id: '66135000022288331',
            name: 'TP Return for 66135000022288306',
          },
          {
            status: 'Booked',
            id: '66135000022288327',
            name: 'TP Return for 66135000022288310',
          },
          {
            status: 'Booked',
            id: '66135000022288323',
            name: 'TP Return for 66135000022288320',
          },
          {
            status: 'Booked',
            id: '66135000022277262',
            name: 'TP Return for 66135000022277003',
          },
          {
            status: 'Delivered',
            id: '66135000022251019',
            name: 'x2 Travis Perkins Returns',
          },
          {
            status: 'Booked',
            id: '66135000022242710',
            name: 'TP Return for 66135000022242650',
          },
          {
            status: 'Booked',
            id: '66135000022242704',
            name: 'TP Return for 66135000022242636',
          },
          {
            status: 'Booked',
            id: '66135000022229466',
            name: 'TP Return for 66135000022229078',
          },
        ],
      },
    ],
  },
};

export default kanbanCollectionsDataMock;
