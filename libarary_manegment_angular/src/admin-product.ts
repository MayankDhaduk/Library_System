import { UUID } from "crypto";

export class AdminProduct {
    id?: UUID;
    pname: string = '';
    pdescription: string = '';
    pprice: string = '';
    pimage: string = '';
    pqty: string = '';
    pauthor: string = '';
    planguage: string = '';
    catid: number = 0;

}