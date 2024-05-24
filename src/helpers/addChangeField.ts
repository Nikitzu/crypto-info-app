import {MappedAsset, MappedAssetWithChange} from '@/types';
import {calculateChange} from './calculateChange';

export const addChangeField = (assets: MappedAsset[]): MappedAssetWithChange[] => {
    return assets.map((asset: MappedAsset) => {
        return {
            ...asset,
            change: calculateChange({ask: asset.ask, bid: asset.bid, open: asset.open})
        }
    });
}
