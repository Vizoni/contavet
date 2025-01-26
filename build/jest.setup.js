import '@testing-library/jest-dom';
import 'jest-canvas-mock';
// Mock DomRect for listbox opening
// Radix Issue: https://github.com/radix-ui/primitives/issues/420#issuecomment-771615182
global.DOMRect = {
    fromRect: () => ({}),
};
//# sourceMappingURL=jest.setup.js.map