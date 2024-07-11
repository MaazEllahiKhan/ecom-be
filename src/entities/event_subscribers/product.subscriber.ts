import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm"
import { ProductEntity } from "../product.entity"
import { ProductSearchEntity } from "../product_search.entity"

// Example of data triggering using typeOrm
// on every new product we trigger afterInsert and add produce to ProductSearchEntity as well.

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<ProductEntity> {
    /**
     * Indicates that this subscriber only listen to ProductEntity events.
     */
    listenTo() {
        console.log(`Listener ready `)
        return ProductEntity
    }

    async afterInsert(event: InsertEvent<ProductEntity>) {
        const productSearchRepo = event.manager.getRepository(ProductSearchEntity);

        const res = await productSearchRepo.save({categoryName: event.entity.productName});
        console.log(`AFTER ENTITY INSERTED: `, res)
    }
}