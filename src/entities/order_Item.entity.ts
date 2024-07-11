import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";

@Entity("order_items", { schema: "e_commerce" })
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  orderItemId: number | null;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @OneToOne(() => OrderEntity, (order) => order.orderId)
  @JoinColumn({name: 'order_id'})
  orderId: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productId)
  @JoinColumn({name: 'product_id'})
  productId: ProductEntity;

  @Column("int", { name: "is_primary_item", nullable: true })
  isPrimaryItem: number | null;

  @Column("double", { name: "price_usd", nullable: true, precision: 22 })
  priceUsd: number | null;

  @Column("double", { name: "cogs_usd", nullable: true, precision: 22 })
  cogsUsd: number | null;
}
