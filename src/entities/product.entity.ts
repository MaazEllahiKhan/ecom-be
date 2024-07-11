import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products", { schema: "e_commerce" })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId: number | null;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @Column("text", { name: "product_name", nullable: true })
  productName: string | null;
}
