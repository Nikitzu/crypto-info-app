import {markets, webSocketUrl} from '@/constants';
import {DataTable} from '@/components';
import {ActionTypes, EventTypes} from '@/enums';
import useWebSocket from './hooks/useWebSocket';

function App() {
    const {assets, loading, error} = useWebSocket(webSocketUrl, {
        action: ActionTypes.Subscribe,
        channels: [{name: EventTypes.Ticker24h, markets}]
    });

    return (
        <div className="relative overflow-x-auto">
            <DataTable isRetrying={loading} assets={assets} isError={!!error}/>
        </div>
    )
}

export default App
