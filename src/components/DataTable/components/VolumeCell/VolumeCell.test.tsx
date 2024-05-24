import {render, screen} from '@testing-library/react';
import {VolumeCell} from './VolumeCell';

describe('VolumeCell', () => {
    test('renders VolumeCell with a valid volume quote', () => {
        render(<table><tbody><tr><VolumeCell volumeQuote="1000" /></tr></tbody></table>);
        const volumeCell = screen.getByText('1,000');
        expect(volumeCell).toBeInTheDocument();
        expect(volumeCell).toHaveClass('px-6 py-4');
    });
});
