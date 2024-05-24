import {render, screen} from '@testing-library/react';
import {EmptyRow} from './EmptyRow';

describe('EmptyRow', () => {
    test('renders an empty row without search action', () => {
        render(<table><tbody><EmptyRow /></tbody></table>);

        const emptyRowElement = screen.getByTestId('empty-row');
        expect(emptyRowElement).toBeInTheDocument();
        expect(emptyRowElement).toHaveClass('border-b bg-blue-50 border-gray-400');

        expect(screen.queryByText('We found nothing, sorry!')).toBeNull();
    });

    test('renders an empty row with search action', () => {
        render(<table><tbody><EmptyRow isSearchAction={true} /></tbody></table>);

        const emptyRowElement = screen.getByTestId('empty-row');
        expect(emptyRowElement).toBeInTheDocument();
        expect(emptyRowElement).toHaveClass('border-b bg-blue-50 border-gray-400');

        expect(screen.getByText('We found nothing, sorry!')).toBeInTheDocument();
    });

    test('renders an empty row with error', () => {
        render(
            <table>
                <tbody>
                <EmptyRow isError={true} />
                </tbody>
            </table>
        );

        const emptyRowElement = screen.getByTestId('empty-row');
        expect(emptyRowElement).toBeInTheDocument();
        expect(emptyRowElement).toHaveClass('border-b bg-blue-50 border-gray-400');

        expect(screen.getByText('We run into an error, sorry!')).toBeInTheDocument();
        expect(screen.queryByText('We found nothing, sorry!')).toBeNull();
    });
});
