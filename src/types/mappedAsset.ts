export type MappedAsset = {
    ask: string;
    last: string;
    volumeQuote: string;
    bid: string;
    open: string;
    market: string;
}

export type MappedAssetWithChange = MappedAsset & {
    change: string
}
