import { UUID } from "crypto";

export class User {
    id?: UUID;
    uname: string = '';
    email: string = '';
    pass: string = '';
    gender: string = '';
    phone: string = '';
}