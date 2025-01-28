import { renderWithProviders } from 'utils/renderWithProviders';

import { Login } from './Login';

const setup = () => renderWithProviders(<Login />);

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should render google login button', () => {
    const { getByText } = setup();

    expect(getByText('Entrar com Google')).toBeInTheDocument();
  });
});
