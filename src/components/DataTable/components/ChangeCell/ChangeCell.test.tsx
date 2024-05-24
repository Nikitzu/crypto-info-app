import {render, screen} from '@testing-library/react';
import {ChangeCell} from './ChangeCell';

describe('ChangeCell', () => {
    test('renders ChangeCell with positive change', () => {
        render(<table><tbody><tr><ChangeCell change="0.05" /></tr></tbody></table>);
        const changeCell = screen.getByText('0.05');
        expect(changeCell).toBeInTheDocument();
        expect(changeCell).toHaveClass('px-6 py-4');
    });

    test('renders ChangeCell with negative change', () => {
        render(<table><tbody><tr><ChangeCell change="-0.05" /></tr></tbody></table>);
        const changeCell = screen.getByText('-0.05');
        expect(changeCell).toBeInTheDocument();
        expect(changeCell).toHaveClass('px-6 py-4');
    });

    test('renders ChangeCell with zero change', () => {
        render(<table><tbody><tr><ChangeCell change="0" /></tr></tbody></table>);
        const changeCell = screen.getByText('0');
        expect(changeCell).toBeInTheDocument();
        expect(changeCell).toHaveClass('px-6 py-4');
    });
});
