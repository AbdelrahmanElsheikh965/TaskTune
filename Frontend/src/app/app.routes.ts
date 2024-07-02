import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [

        {
            path: "",
            component: ContainerComponent,
            title: "Store"
        },
        {
            path: "login",
            component: LoginComponent,
            title: "Login"
        },
        {
            path: "register",
            component: RegisterComponent,
            title: "Register"
        },
        {
            path: "cart",
            component: CartComponent,
            title: "Cart"
        },
        {
            path: "details/:id",
            component: DetailComponent,
            title: "Product Details"
        },
        {
            path: "**",
            component: NotfoundComponent
        }


];
