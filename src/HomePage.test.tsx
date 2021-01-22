import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('When HomePage first rendered, loading indicator should show', () => {
  let mock: any = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <HomePage history={mock} location={mock} match={mock} />
    </BrowserRouter>,
  );

  const loading = getByText('Unanswered');
  expect(loading).not.toBeNull();
});
