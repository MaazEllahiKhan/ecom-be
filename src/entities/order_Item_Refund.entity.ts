import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_item_refunds", { schema: "e_commerce" })
export class OrderItemRefundEntity {
  @PrimaryGeneratedColumn()
  orderItemRefundId: number | null;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @Column("int", { name: "order_item_id", nullable: true })
  orderItemId: number | null;

  @Column("int", { name: "order_id", nullable: true })
  orderId: number | null;

  @Column("decimal", { name: "price_usd", nullable: true, precision: 18, scale: 8 })
  refundAmountUsd: number | null;
}
