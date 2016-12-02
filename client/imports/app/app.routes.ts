import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { WishlistListComponent } from './wishlist/wishlist-list.component';
import { ItemDetailsComponent } from './wishlist/item-details.component';

export const routes: Route[] = [
  { path: '', component: WishlistListComponent },
  { path: 'item/:itemId', component: ItemDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
