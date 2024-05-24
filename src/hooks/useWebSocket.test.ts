import {waitFor} from '@testing-library/react';
import {MutableRefObject} from 'react';
import {Server} from 'mock-socket';
import {act, renderHook} from '@testing-library/react';
import {MappedAssetWithChange, SubParams} from '@/types';
import {EventTypes} from '@/enums';
import useWebSocket from './useWebSocket';

describe('useWebSocket', () => {
    let mockServer: Server;
    let subParams: SubParams;

    beforeEach(() => {
        mockServer = new Server('ws://localhost:1234');
        subParams = {
            action: 'subscribe',
            channels: [{ name: EventTypes.Ticker24h, markets: ['defaultValue'] }]
        };

        global.WebSocket = WebSocket
    });

    afterEach(() => {
        mockServer.stop();
    });

    test('should get data from the WebSocket', async () => {
        mockServer.on('connection', server => {
            setTimeout(() => {
                server.send('{"event":"ticker24h", "data":[{"market":"TestMarker","open":"0.5","last":"0.1","bid":"0.4","ask":"0.5","volumeQuote":"1000"}]}');
            }, 100);
        });

        let hookResult: MutableRefObject<{ assets:  MappedAssetWithChange[], error: Event | null, loading: boolean }>;

        await act(async () => {
            const {result} = renderHook(() => useWebSocket('ws://localhost:1234', subParams));
            hookResult = result;
        })

        await waitFor(() => {
            expect(hookResult.current.assets).toHaveLength(1);
            expect(hookResult.current.assets[0].market).toBe('TestMarker');
            expect(hookResult.current.loading).toBe(false);
        });
    });

    test('should handle server disconnect properly', async () => {
        const { result } = renderHook(() => useWebSocket('ws://localhost:1234', subParams));

        act(() => {
            mockServer.close();
        });

        await waitFor(() => result.current.error !== null);

        await waitFor(() => {
            expect(result.current.error).toBeDefined();
            expect(result.current.loading).toBe(true);
        })
    });

    test('should not get data if the WebSocket does not send any', async () => {
        mockServer.on('connection', () => {
            // No data sent
        });

        let hookResult: MutableRefObject<{ assets:  MappedAssetWithChange[], error: Event | null, loading: boolean }>;

        await act(async () => {
            const {result} = renderHook(() => useWebSocket('ws://localhost:1234', subParams));
            hookResult = result;
        })

        await waitFor(() => {
            expect(hookResult.current.assets).toHaveLength(0);
            expect(hookResult.current.loading).toBe(true);
        });
    });

    test('should handle WebSocket errors', async () => {
        mockServer.on('connection', (server) => {
            server.close({reason: '', wasClean: false, code: 1006 });
        });

        let hookResult: MutableRefObject<{ assets:  MappedAssetWithChange[], error: Event | null, loading: boolean }>;

        await act(async () => {
            const {result} = renderHook(() => useWebSocket('ws://localhost:1234', subParams));
            hookResult = result;
        })

        await waitFor(() => !!hookResult.current.error);

        await waitFor(() => {
            expect(hookResult.current.error).toBeDefined();
            expect(hookResult.current.loading).toBe(true);
        })
    });

    test('should attempt to reconnect after error', async () => {
        const { result } = renderHook(() => useWebSocket('ws://localhost:1234', subParams, 100));

        act(() => {
            mockServer.emit('error', {});
        });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(result.current.loading).toBe(true);
    });

    test('should send subscription message after connection established', (done) => {
        mockServer.on('connection', (server) => {
            server.on('message', (data) => {
                expect(JSON.parse(data as string)).toEqual(subParams);
                done();
            });
        });

        renderHook(() => useWebSocket('ws://localhost:1234', subParams));
    });
});
