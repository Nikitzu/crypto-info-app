<img width="32" src="./public/crypto.svg" alt="Logo of the project" align="right">

# Crypto Info App
![yarn](https://img.shields.io/badge/yarn-1.22.21-blue) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

A small inforamtive solution has been developed to display all the markets available to customers. Given the frequent addition of new assets with the help of open bitavao websocket, this production-oriented code is designed for any future expansion in the number of markets.

## Built With
- [React](https://react.dev/).
- [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vitejs.dev/guide/).
- [TailwindCSS](https://tailwindcss.com/).
- [Jest](https://jestjs.io/).
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting started

To launch the app, kindly follow these steps:

1. Download the project and navigate to the root folder. Run the following command to install all the required dependencies:

```shell
yarn install
```

2. To initiate the app, execute the following command:

```shell
yarn dev
```
This command will start the development server on port 5173.

## Tests

To run tests, simply use the following command:

```shell
yarn test
```
Here is an illustrative example of a basic test from the project:

```ts
import {addChangeField} from './addChangeField';
import {MappedAsset, MappedAssetWithChange} from '@/types';
import {calculateChange} from './calculateChange';

jest.mock('./calculateChange', () => ({
    calculateChange: jest.fn(() => 'mockedChange'),
}));

describe('addChangeField', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('adds change field to each asset', () => {
        const mockAssets: MappedAsset[] = [
            {ask: '10', bid: '9', open: '10', last: '11', volumeQuote: '100', market: 'BTC/USD'},
        ];

        const expectedMappedAssetsWithChange: MappedAssetWithChange[] = mockAssets.map((asset) => ({
            ...asset,
            change: 'mockedChange',
        }));

        const result = addChangeField(mockAssets);

        expect(result).toEqual(expectedMappedAssetsWithChange);
        expect(calculateChange).toHaveBeenCalledTimes(mockAssets.length);
    });

    test('handles empty array', () => {
        const result = addChangeField([]);
        expect(result).toEqual([]);
        expect(calculateChange).not.toHaveBeenCalled();
    });

    test('adds change field for assets with undefined bid and open', () => {
        const mockAssets: MappedAsset[] = [
            {ask: '10', bid: '', open: '', last: '11', volumeQuote: '100', market: 'BTC/USD'},
        ];

        const expectedMappedAssetsWithChange: MappedAssetWithChange[] = mockAssets.map((asset) => ({
            ...asset,
            change: 'mockedChange',
        }));

        const result = addChangeField(mockAssets);

        expect(result).toEqual(expectedMappedAssetsWithChange);
        expect(calculateChange).toHaveBeenCalledTimes(mockAssets.length);
    });

    test('handles null calculateChange result', () => {
        (calculateChange as jest.Mock).mockReturnValueOnce(null);

        const mockAssets: MappedAsset[] = [
            {ask: '10', bid: '9', open: '10', last: '11', volumeQuote: '100', market: 'BTC/USD'},
        ];

        const result = addChangeField(mockAssets);

        expect(result.every((asset) => asset.change === null)).toBe(true);
        expect(calculateChange).toHaveBeenCalledTimes(mockAssets.length);
    });
});

```
The purpose of this test example is to verify the functionality of the helper function responsible for calculating the additional property of markets.