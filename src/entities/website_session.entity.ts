import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("website_sessions", { schema: "e_commerce" })
export class WebsiteSessionEntity {
  @PrimaryGeneratedColumn()
  websiteSessionId: number | null;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "is_repeat_session", nullable: true })
  isRepeatSession: number | null;

  @Column("text", { name: "utm_source", nullable: true })
  utmSource: string | null;

  @Column("text", { name: "utm_campaign", nullable: true })
  utmCampaign: string | null;

  @Column("text", { name: "utm_content", nullable: true })
  utmContent: string | null;

  @Column("text", { name: "device_type", nullable: true })
  deviceType: string | null;

  @Column("text", { name: "http_referer", nullable: true })
  httpReferer: string | null;
}
