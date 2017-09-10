import { Upload } from '../core/upload';

export interface User {
    email: string;
    password: string;
    name?: string;
    firstname?: string;
    lastname?: string;
    balance?: number;
    picture?: Upload;
}
