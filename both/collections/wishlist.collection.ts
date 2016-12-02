import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Item } from '../models/item.model';

export const Wishlist = new MongoObservable.Collection<Item>('wishlist');

function loggedIn() {
  return !!Meteor.user();
}

Wishlist.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
