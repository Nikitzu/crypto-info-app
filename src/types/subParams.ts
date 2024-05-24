import {EventTypes} from '@/enums';

export type SubParams = {
    action: string;
    channels: {name: EventTypes, markets: string[]}[];
}
