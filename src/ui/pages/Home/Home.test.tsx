import { renderWithProviders } from 'utils/renderWithProviders';

import { Home } from './Home';

const setup = () => renderWithProviders(<Home />);

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
