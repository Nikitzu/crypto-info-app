import {ChangeEventHandler, memo, useEffect} from 'react';
import {debounce} from '@/helpers';

type SearchBarProps = {
    onInputChange: ChangeEventHandler<HTMLInputElement>
}

export const SearchBar = memo(({onInputChange}: SearchBarProps) => {
    const debouncedResults = debounce(onInputChange, 300);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    },[debouncedResults]);

    return (
        <div className="border-b-1 rounded-t-lg w-full flex justify-between p-5 text-xl font-semibold text-left rtl:text-right text-white bg-blue-500">
            <span>
                Our assets
                <p className="mt-1 text-sm font-normal text-gray-100">
                    Browse a list of available assets
                </p>
            </span>
            <div>
                <label
                    htmlFor="table-search"
                    className="sr-only"
                >
                    Search
                </label>
                <div className="relative ml-3 py-3">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        onChange={onInputChange}
                        type="text"
                        id="table-search"
                        className="outline-0 block pt-1.5 pb-1.5 ps-10 text-sm rounded-lg w-80 bg-blue-600 placeholder-blue-300 text-blue-300"
                        placeholder="Search for assets"
                    />
                </div>
            </div>
        </div>

    )
})
SearchBar.displayName = 'SearchBar'
