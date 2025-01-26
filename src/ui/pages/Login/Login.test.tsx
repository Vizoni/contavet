import { renderWithProviders } from 'utils/renderWithProviders';

import { Login } from './Login';

const setup = () => renderWithProviders(<Login />);

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
