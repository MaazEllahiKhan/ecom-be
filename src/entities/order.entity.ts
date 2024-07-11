import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders", { schema: "e_commerce" })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number | null;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @Column("int", { name: "website_session_id", nullable: true })
  websiteSessionId: number | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "primary_product_id", nullable: true })
  primaryProductId: number | null;

  @Column("int", { name: "items_purchased", nullable: true })
  itemsPurchased: number | null;

  @Column("double", { name: "price_usd", nullable: true, precision: 22 })
  priceUsd: number | null;

  @Column("double", { name: "cogs_usd", nullable: true, precision: 22 })
  cogsUsd:  number| null;
}
