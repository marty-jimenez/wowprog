import { fireEvent, render, screen } from '@testing-library/react';
import ClientLogin from '../ClientLogin';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

describe('client login', () => {
  test('empty input', () => {
    const setTokenMock = jest.fn();
    render(<ClientLogin setToken={setTokenMock} />);
    expect(screen.getByTestId('client-id-field'));
    expect(screen.getByTestId('client-secret-field'));
    expect(screen.getByTestId('client-submit'));
    expect(screen.getByTestId('client-submit')).toBeDisabled();
  });

  test('filled input - invalid', async () => {
    const setTokenMock = jest.fn();
    const mock = new MockAdapter(axios);

    render(<ClientLogin setToken={setTokenMock} />);
    const idField = screen.getByLabelText(/^Client Id/i);
    const secretField = screen.getByLabelText(/^Client Secret/i);
    const submitButton = screen.getByTestId('client-submit');
    expect(screen.getByTestId('client-submit')).toBeDisabled();

    act(() => {
      fireEvent.change(idField, { target: { value: 'invalidID' } });
      fireEvent.change(secretField, {
        target: { value: 'invalidSecret' }
      });
    });

    expect(submitButton).not.toBeDisabled();

    await act(async () => {
      mock.onGet().reply(500);
      fireEvent.click(submitButton);
    });
  });
});
