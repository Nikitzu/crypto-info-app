import {MappedAsset, MappedAssetWithChange} from '@/types';
import {calculateChange} from './calculateChange';

export const updateAssets = (previousAssets: MappedAssetWithChange[], newAssets: MappedAsset[]): MappedAssetWithChange[] => {
    const updatedAssets = [...previousAssets];
    const assetMap = new Map(updatedAssets.map(asset => [asset.market, asset]));

    newAssets.forEach((newAsset: MappedAsset) => {
        const existingAsset = assetMap.get(newAsset.market);
        const change = calculateChange({ask: newAsset.ask, bid: newAsset.bid, open: newAsset.open})

        if (existingAsset) {
            existingAsset.ask = newAsset.ask;
            existingAsset.last = newAsset.last;
            existingAsset.volumeQuote = newAsset.volumeQuote;
            existingAsset.bid = newAsset.bid;
            existingAsset.open = newAsset.open;
            existingAsset.change = change;
        } else {
            updatedAssets.push({...newAsset, change});
        }
    });

    return updatedAssets;
}
