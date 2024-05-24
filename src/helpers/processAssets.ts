import {SortFields, SortOrder} from '@/enums';
import {MappedAssetWithChange} from '@/types';

export const processAssets = (assets: MappedAssetWithChange[], sortOrder: SortOrder | '', sortField: SortFields | null, searchTerm: string = '') => {
    let result = [...assets]
    if (searchTerm) {
        result = result.filter((asset) => {
            return asset.market.includes(searchTerm.toUpperCase());
        })
    }
    if (sortField && sortOrder) {
        if (sortField !== SortFields.Asset) {
            result.sort((a, b) => {
                return parseFloat(a[sortField]) - parseFloat(b[sortField])
            });
        } else {
            result.sort((a, b) => {
                return a.market > b.market ? 1 : a.market < b.market ? -1 : 0
            });
        }

        if (sortOrder === SortOrder.DESC) {
            result.reverse();
        }
    }
    return result;
}
