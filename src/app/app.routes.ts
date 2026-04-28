import {Routes} from '@angular/router';
import {HomeComponent} from './home';
import {CheckoutComponent} from './checkout';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent }
];
