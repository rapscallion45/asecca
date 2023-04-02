import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Cell from './Cell';

/* test text */
const testValue = 'Device Processing';

/* test style */
const testSx = { fontWeight: 'bold' };

/* Data Table Cell Unit Tests */
/* ========================== */
describe('Data Table Cell', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(<Cell value={testValue} sx={testSx} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Value', () => {
    it('Should render passed value', async () => {
      /* Arrange */
      /* Act */
      render(<Cell value={testValue} sx={testSx} />);

      /* Assert */
      expect(screen.getByText(testValue)).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('Should render passed styling props', async () => {
      /* Arrange */
      /* Act */
      render(<Cell value={testValue} sx={testSx} />);

      /* Assert */
      expect(screen.getByText(testValue)).toBeInTheDocument();
    });
  });
});
