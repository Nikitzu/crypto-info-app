import {render, screen, fireEvent} from '@testing-library/react';
import {SortOrder} from '@/enums';
import {TableHeader} from './TableHeader';

describe('TableHeader', () => {
    const mockSortingHandler = jest.fn();
    const headerCellsFields = ['market', 'last', 'volumeQuote', 'change'];
    const headerCellsNames = ['Asset', 'Price', 'Volume', 'Change'];

    test('renders table header cells with correct labels', () => {
        render(
            <table>
                <TableHeader
                    sortingHandler={mockSortingHandler}
                    sortField="change"
                    sortOrder={SortOrder.ASC}
                />
            </table>
        );

        headerCellsNames.forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    test('calls sortingHandler when a header cell is clicked', () => {
        render(
            <table>
                <TableHeader
                    sortingHandler={mockSortingHandler}
                    sortField="market"
                    sortOrder={SortOrder.ASC}
                />
            </table>
        );

        headerCellsFields.forEach((field) => {
            fireEvent.click(screen.getByText(headerCellsNames[headerCellsFields.indexOf(field)]));
            expect(mockSortingHandler).toHaveBeenCalledWith(field);
        });
    });

    test('displays sorting indicator for the sorted field', () => {
        render(
            <table>
                <TableHeader
                    sortingHandler={mockSortingHandler}
                    sortField="last"
                    sortOrder={SortOrder.ASC}
                />
            </table>
        );

        const sortingIndicator = screen.getByTestId('sortingIndicator');
        expect(sortingIndicator).toBeInTheDocument();
        expect(sortingIndicator).toHaveAttribute('transform', '');
    });

    test('displays reversed sorting indicator for the sorted field in descending order', () => {
        render(
            <table>
                <TableHeader
                    sortingHandler={mockSortingHandler}
                    sortField="volumeQuote"
                    sortOrder={SortOrder.DESC}
                />
            </table>
        );

        const sortingIndicator = screen.getByTestId('sortingIndicator');
        expect(sortingIndicator).toBeInTheDocument();
        expect(sortingIndicator).toHaveAttribute('transform', 'scale(1,-1)');
    });
});

