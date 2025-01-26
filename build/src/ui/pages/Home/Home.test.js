import { jsx as _jsx } from "react/jsx-runtime";
import { renderWithProviders } from 'utils/renderWithProviders';
import { Home } from './Home';
const setup = () => renderWithProviders(_jsx(Home, {}));
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
//# sourceMappingURL=Home.test.js.map