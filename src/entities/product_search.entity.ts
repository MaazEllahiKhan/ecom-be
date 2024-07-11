import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_search", { schema: "e_commerce" })
export class ProductSearchEntity {
  @PrimaryGeneratedColumn({name: 'item_no'})
  itemNo: number | null;

  @Index("categoryName-idx")
  @Column("varchar", { name: "category_name", nullable: true })
  categoryName: string | null;

  @Column("text", { name: "item_description", nullable: true })
  itemDescription: string | null;

  @Column("int", { name: "vendor", nullable: true })
  vendor: number | null;

  @Column("text", { name: "vendor_name", nullable: true })
  vendorName: string | null;

  @Column("int", { name: "bottle_size", nullable: true })
  bottleSize: number | null;

  @Column("int", { name: "pack", nullable: true })
  pack: number | null;

  @Column("int", { name: "inner_pack", nullable: true })
  innerPack: number | null;

  @Column("text", { name: "age", nullable: true })
  age: string | null;

  @Column("int", { name: "proof", nullable: true })
  proof: number | null;

  @Column("text", { name: "list_date", nullable: true })
  listDate: string | null;

  @Column("text", { name: "upc", nullable: true })
  upc: string | null;

  @Column("text", { name: "scc", nullable: true })
  scc: string | null;

  @Column("text", { name: "bottle_price", nullable: true })
  bottlePrice: string | null;

  @Column("double", { name: "shelf_price", nullable: true, precision: 22 })
  shelfPrice: number | null;

  @Column("double", { name: "case_cost", nullable: true, precision: 22 })
  caseCost: number | null;
}
