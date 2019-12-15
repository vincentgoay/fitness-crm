import { Record } from './record';
import { Image } from './image';

export interface Customer {
    _id?: string,
    name: string,
    username?: string,
    height: number,
    birth_year: number,
    gender: string,
    phone?: string,
    deleted?: boolean,
    records?: Record[],
    images?: Image[] 
}