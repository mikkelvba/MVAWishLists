import { Wishlist } from '../../../both/collections/wishlist.collection';
import { Item } from '../../../both/models/item.model';

export function loadWishlist() {
  if (Wishlist.find().cursor.count() === 0) {
    const wishlist: Item[] = [{
      itemName: 'Dummy item',
      description: 'Here\'s a description...',
      price: 100,
      public: false
    }];

    wishlist.forEach((item: Item) => Wishlist.insert(item));
  }
}
