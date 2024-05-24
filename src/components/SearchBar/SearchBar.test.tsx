import {render, screen, fireEvent, act} from '@testing-library/react';
import {SearchBar} from './SearchBar';

describe('SearchBar', () => {
    test('triggers onInputChange when typing in the input field', () => {
        const mockInputChange = jest.fn();
        render(<SearchBar onInputChange={mockInputChange} />);
        const inputElement = screen.getByPlaceholderText('Search for assets');

        fireEvent.change(inputElement, { target: { value: 'BTC' } });

        expect(mockInputChange).toHaveBeenCalledTimes(1);
        expect(mockInputChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'BTC' }) }));
    });

    test('debounces onInputChange with a delay of 300ms', async () => {
        jest.useFakeTimers();

        const mockInputChange = jest.fn();
        render(<SearchBar onInputChange={mockInputChange} />);
        const inputElement = screen.getByPlaceholderText('Search for assets');

        fireEvent.change(inputElement, { target: { value: 'BTC' } });

        act(() => {
            jest.runAllTimers();
        });

        expect(mockInputChange).toHaveBeenCalledTimes(1);
        expect(mockInputChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'BTC' }) }));

        jest.useRealTimers();
    });

    test('cancels debouncedResults on component unmount', () => {
        jest.useFakeTimers();

        const mockInputChange = jest.fn();
        render(<SearchBar onInputChange={mockInputChange} />);
        const inputElement = screen.getByPlaceholderText('Search for assets');

        fireEvent.change(inputElement, { target: { value: 'BTC' } });

        act(() => {
            jest.runAllTimers();
        });

        expect(mockInputChange).toHaveBeenCalledTimes(1);
        expect(mockInputChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'BTC' }) }));

        jest.useRealTimers();
    });
});
