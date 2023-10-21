import { ICollectionFormQuoteDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/quote/api/quote
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 */
const collectionFormQuoteDataMock: ICollectionFormQuoteDataPayload = {
  quotes: [
    {
      id: '12345',
      name: 'Example (03/08/23)',
    },
    {
      id: '67324',
      name: null,
    },
  ],
  preview: [
    {
      model: {
        id: '37821',
        display_name: 'Apple iPhone 8 64GB',
      },
      prices: {
        fully_working: '80.00',
        minor_technical_faults: '50.00',
        major_technical_faults: '25.00',
        does_not_turn_on: '0.00',
      },
    },
  ],
  conflicts: [
    {
      model: {
        model: {
          id: '4538792',
          display_name: 'Samsung Galaxy A21s',
        },
        prices: {
          fully_working: '80.00',
          minor_technical_faults: '50.00',
          major_technical_faults: '25.00',
          does_not_turn_on: '0.00',
        },
      },
      conflicting_quotes: [
        {
          quote: {
            id: '420893',
            name: null,
          },
          prices: {
            fully_working: '80.00',
            minor_technical_faults: '50.00',
            major_technical_faults: '25.00',
            does_not_turn_on: '0.00',
          },
        },
        {
          quote: {
            id: '437892',
            name: null,
          },
          prices: {
            fully_working: '70.00',
            minor_technical_faults: '40.00',
            major_technical_faults: '20.00',
            does_not_turn_on: '0.00',
          },
        },
      ],
    },
    {
      model: {
        model: {
          id: '4538793',
          display_name: 'Samsung Galaxy s20',
        },
        prices: {
          fully_working: '80.00',
          minor_technical_faults: '50.00',
          major_technical_faults: '25.00',
          does_not_turn_on: '0.00',
        },
      },
      conflicting_quotes: [
        {
          quote: {
            id: '420895',
            name: null,
          },
          prices: {
            fully_working: '80.00',
            minor_technical_faults: '50.00',
            major_technical_faults: '25.00',
            does_not_turn_on: '0.00',
          },
        },
        {
          quote: {
            id: '437894',
            name: null,
          },
          prices: {
            fully_working: '70.00',
            minor_technical_faults: '40.00',
            major_technical_faults: '20.00',
            does_not_turn_on: '0.00',
          },
        },
      ],
    },
  ],
};

export default collectionFormQuoteDataMock;
