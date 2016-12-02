import { CollectionObject } from './collection-object.model';

export interface Item extends CollectionObject {
    itemName: string;
    description: string;
    price: number;
    owner?: string;
    public: boolean;
}
