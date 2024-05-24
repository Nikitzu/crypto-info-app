import {MappedAsset, Ticker24hUpdate} from '@/types';

export const mapAssets = (assets: Ticker24hUpdate[]): MappedAsset[] => {
    return assets.map((asset: Ticker24hUpdate) => {
        return {
            ask: asset.ask ? asset.ask : '',
            last: asset.last ? asset.last : '',
            volumeQuote: asset.volumeQuote ? asset.volumeQuote : '',
            bid: asset.bid ? asset.bid : '',
            open: asset.open ? asset.open : '',
            market: asset.market.replace('-EUR', ''),
        }
    });
}
