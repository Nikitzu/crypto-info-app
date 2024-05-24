import {useState, useRef, useEffect, useCallback} from 'react';
import {EventTypes} from '@/enums';
import {addChangeField, mapAssets, updateAssets} from '@/helpers';
import {MappedAssetWithChange, SubParams} from '@/types';

const useWebSocket = (url: string, subParams: SubParams, reconnectInterval = 1000) => {
    const [assets, setAssets] = useState<MappedAssetWithChange[]>([])
    const [error, setError] = useState<null | Event>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const ws = useRef<null | WebSocket>(null);

    const connect = useCallback(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            setError(null);
            if (ws.current?.readyState === ws.current?.OPEN){
                ws.current?.send(JSON.stringify(subParams));
            }
        };

        ws.current.onmessage = ({data}) => {
            const assetsResponse = JSON.parse(data);
            if (assetsResponse.event === EventTypes.Ticker24h) {
                setAssets((prevAssets) => {
                    const newAssets= mapAssets(assetsResponse.data);
                    if (!prevAssets.length) {
                        return addChangeField(newAssets);
                    }
                    return updateAssets(prevAssets, newAssets);
                });
                setLoading(false);
            }
        };

        ws.current.onerror = (event) => {
            ws.current?.close();
            setError(event);
        };

        ws.current.onclose = (event) => {
            if (!event.wasClean) {
                setError(event);
            }
            setLoading(true);
        };

    }, [url, subParams]);

    const disconnect = useCallback(() => {
        if (ws.current) {
            ws.current.onclose = () => {};
            ws.current.close();
        }
    }, []);

    useEffect(() => {
        connect();
        return disconnect;
    }, [connect, disconnect]);

    useEffect(() => {
        let reconnect: NodeJS.Timeout;
        if (error && ws.current?.readyState !== WebSocket.OPEN) {
            reconnect = setTimeout(connect, reconnectInterval);
        }
        return () => reconnect && clearTimeout(reconnect);
    }, [error, connect, reconnectInterval]);

    useEffect(() => {
        const handleFocus = () => {
            disconnect();
            connect();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [connect, disconnect]);

    return { assets, error, loading };
};

export default useWebSocket;
