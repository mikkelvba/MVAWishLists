import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InjectUser } from "angular2-meteor-accounts-ui";

import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Wishlist } from '../../../../both/collections/wishlist.collection';
import { Item } from '../../../../both/models/item.model';

import template from './wishlist-list.component.html';

@Component({
    selector: 'wishlist-list',
    template
})
@InjectUser('user')
export class WishlistListComponent implements OnInit, OnDestroy {
    wishlist: Observable<Item[]>;
    wishlistSub: Subscription;
    user: Meteor.User;

    ngOnInit() {
        this.wishlist = Wishlist.find({}).zone();
        this.wishlistSub = MeteorObservable.subscribe('wishlist').subscribe();
    }

    removeItem(item: Item): void {
        Wishlist.remove(item._id);
    }

    search(value: string): void {
        this.wishlist = Wishlist.find(value ? { itemName: value } : {}).zone();
    }

    isOwner(item: Item): boolean {
        return this.user && this.user._id === item.owner;
    }


    ngOnDestroy() {
        this.wishlistSub.unsubscribe();
    }
}
