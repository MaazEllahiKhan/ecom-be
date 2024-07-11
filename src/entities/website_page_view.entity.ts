import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("website_pageviews", { schema: "e_commerce" })
export class WebsitePageViewEntity {
  @PrimaryGeneratedColumn()
  websitePageviewId: number | null;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @Column("int", { name: "website_session_id", nullable: true })
  websiteSessionId: number | null;

  @Column("text", { name: "pageview_url", nullable: true })
  pageviewUrl: string | null;
}
