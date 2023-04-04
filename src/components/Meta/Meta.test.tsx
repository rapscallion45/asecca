import React from 'react';
import renderer from 'react-test-renderer';
import Meta from './Meta';

/* Meta Unit Tests */
/* =============== */
describe('Meta', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer.create(<Meta />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
