import {render, screen} from '@testing-library/react';
import {LastPriceCell} from './LastPriceCell';

describe('LastPriceCell', () => {
    test('renders LastPriceCell with a valid last price', () => {
        render(<table><tbody><tr><LastPriceCell lastPrice="110.50" /></tr></tbody></table>);
        const lastPriceCell = screen.getByText('€110.50');
        expect(lastPriceCell).toBeInTheDocument();
        expect(lastPriceCell).toHaveClass('px-6 py-4');
    });
});
