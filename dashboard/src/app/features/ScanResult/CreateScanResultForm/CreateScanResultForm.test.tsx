import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import CreateScanResultForm from './CreateScanResultForm';

const noop = () => { };

describe('CreateScanResultForm', () => {

  it('renders correctly', () => {
    expect(renderer.create(<BrowserRouter><CreateScanResultForm onSubmit={noop} /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

});
