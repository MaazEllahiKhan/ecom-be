import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm'
  
  @Entity("admin", { schema: "e_commerce" })
  export class AdminUserEntity {
    @PrimaryGeneratedColumn()
    admin_id: number
  
    @Column()
    first_name: string
  
    @Column()
    last_name: string
  
    @Column()
    email: string
  
    @Column()
    password: string
  
    @Column()
    twoFA_Key: string
  
    @Column({ default: false })
    is2faEnabled: boolean
  
    @Column({ default: false })
    is_blocked: boolean
  
    @Column({ default: '' })
    status: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  }
  