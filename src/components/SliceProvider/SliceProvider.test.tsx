import React, { FC } from 'react';
import { render } from '@testing-library/react';
import { Slice, createSlice } from '@reduxjs/toolkit';
import SliceProvider from './SliceProvider';

/* test child component */
const TestChild: FC = () => <div>Test child</div>;

/* test slice data */
const testSlice: Slice = createSlice({
  name: 'testSlice',
  initialState: {},
  reducers: {},
});

/**
 * Slice Provider Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Slice Provider', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <SliceProvider slice={testSlice}>
        <TestChild />
      </SliceProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
