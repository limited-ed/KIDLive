import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'core/guarsds/authentication.guard';

import { MainComponent, HelloComponent } from './components';

const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [ AuthenticationGuard ],
        children: [
            { path: '',  component: HelloComponent},
            { path: 'orders', loadChildren: () => import('orders/orders.module').then( module => module.OrdersModule)},
            { path: 'users', loadChildren: () => import('users/users.module').then( module => module.UsersModule) }
        ]
    }

];

// tslint:disable-next-line:variable-name
export const MainRoutes = RouterModule.forChild(routes);
