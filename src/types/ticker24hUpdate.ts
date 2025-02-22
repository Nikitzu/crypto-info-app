export type Ticker24hUpdate = {
    ask: string;
    askSize: string;
    market: string;
    timestamp: number;
    bid: string | null;
    bidSize: string | null;
    high: string | null;
    last: string | null;
    low: string | null;
    open: string | null;
    volume: string | null;
    volumeQuote: string | null;
}
