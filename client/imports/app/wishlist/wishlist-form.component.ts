import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Wishlist } from '../../../../both/collections/wishlist.collection';

import template from './wishlist-form.component.html';

@Component({
    selector: 'wishlist-form',
    template
})
export class WishlistFormComponent implements OnInit {
    addForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            itemName: ['', Validators.required],
            description: [],
            price: ['', Validators.required],
            public: [false]
        });
    }

    addItem(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add an item');
            return;
        }

        if (this.addForm.valid) {
            Wishlist.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));

            this.addForm.reset();
        }
    }
}
