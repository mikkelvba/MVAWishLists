import { Meteor } from 'meteor/meteor';
import { Wishlist } from '../../../both/collections/wishlist.collection';

Meteor.publish('wishlist', function() {
    return Wishlist.find(buildQuery.call(this));
});

Meteor.publish('item', function(itemId: string) {
    return Wishlist.find(buildQuery.call(this, itemId));
});


function buildQuery(itemId?: string): Object {
    const isAvailable = {
        $or: [{
            // item is public
            public: true
        },
            // or
            {
                // current user is the owner
                $and: [{
                    owner: this.userId
                }, {
                        owner: {
                            $exists: true
                        }
                    }]
            }]
    };

    if (itemId) {
        return {
            // only single item
            $and: [{
                _id: itemId
            },
                isAvailable
            ]
        };
    }

    return isAvailable;
}
