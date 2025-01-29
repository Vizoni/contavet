import { renderWithProviders } from 'utils/renderWithProviders';
import userEvent from '@testing-library/user-event';
import * as reactOauthGoogle from '@react-oauth/google';

import { Login } from './Login';
import { act } from 'react';

const setup = () => renderWithProviders(<Login />);
const mockedOnSuccess = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();

    jest.spyOn(reactOauthGoogle, 'useGoogleLogin').mockReturnValue(mockedOnSuccess);
    // jest.spyOn(reactOauthGoogle, 'useGoogleLogin').mockReturnValue(
    //   jest.fn().mockReturnValue({
    //     onSuccess: mockedOnSucces,
    //   })
    // );
  });

  it('should match snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should render google login button', () => {
    const { getByText } = setup();

    expect(getByText('Entrar com Google')).toBeInTheDocument();
  });

  it('should handle click on google login button', async () => {
    const { getByText } = setup();

    const button = getByText('Entrar com Google');
    await act(async () => userEvent.click(button));

    expect(button).toBeEnabled();
    expect(mockedOnSuccess).toHaveBeenCalledTimes(1);
  });
});
