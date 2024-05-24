import {render, screen} from '@testing-library/react';
import {AssetCell} from './AssetCell';

jest.mock('@/assets/market-icons.svg', () => 'svg-test-file');

describe('AssetCell', () => {
    test('renders AssetCell with market', () => {
        render(<table><tbody><tr><AssetCell market="BTC/USD" /></tr></tbody></table>);
        const svgUseElement = screen.getByTestId('svg-icon-use');
        expect(svgUseElement).toBeInTheDocument();
        expect(svgUseElement).toHaveAttribute('href', expect.stringMatching('svg-test-file#btc/usd'));
        expect(screen.getByText('BTC/USD')).toBeInTheDocument();
    });
});
