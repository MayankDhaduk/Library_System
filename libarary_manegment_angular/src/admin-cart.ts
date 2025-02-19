import { UUID } from "crypto";
import { AdminProduct } from "./admin-product";
import { User } from "./user";

export class Cart {
    
    id?: UUID;
    pqty: string = '';
    product?: AdminProduct;
    user?: User[] = [];

}