import { Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LibraryshowComponent } from './libraryshow/libraryshow.component';
import { AdminComponent } from './admin/admin.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AdmincategoryComponent } from './admincategory/admincategory.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { ViewproductinuserComponent } from './viewproductinuser/viewproductinuser.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: '', component: UserRegisterComponent },
    { path: 'login', component: LoginUserComponent },
    { path: 'library', component: LibraryshowComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'viewuser', component: ViewUserComponent },
    { path: 'admincategory', component: AdmincategoryComponent },
    { path: 'adminproduct', component: AdminproductComponent },
    { path: 'viewproduct', component: ViewproductinuserComponent },
    { path: 'viewcart', component: CartComponent },
    { path: "**", component: LoginUserComponent }
];
