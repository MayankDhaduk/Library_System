import { UUID } from "crypto";

export class AdminProduct {
    id?: UUID;
    pname: string = '';
    pdescription: string = '';
    pprice: number = 0;
    pimage: string = '';
    pqty: number = 0;
    
}