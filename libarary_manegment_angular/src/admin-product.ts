import { UUID } from "crypto";

export class AdminProduct {
    id?: UUID;
    pname: string = '';
    pdescription: string = '';
    pprice: any;
    pimage: string = '';
    pqty: any;
    pauthor: string = '';
    planguage: string = '';
    catid?: UUID;
    imageUrl?: string;

}