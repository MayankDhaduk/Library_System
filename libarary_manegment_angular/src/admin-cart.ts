import { UUID } from "crypto";
import { AdminProduct } from "./admin-product";
import { User } from "./user";

export class Cart {
    id?: UUID;
    product: AdminProduct = { pauthor: '', pdescription: '', pimage: '', pprice: '', planguage: '', pname: '', pqty: '' };
    user: User[] = [];
    qty: any;
}