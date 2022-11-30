import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    comment: '微信openid',
    length: 250,
    nullable: true,
  })
  openid: string;

  @Column({
    comment: '微信昵称',
    nullable: true,
    charset: 'utf8mb4',
    length: 100,
  })
  nickName: string;

  @Column({
    comment: '微信头像',
    nullable: true,
    length: 250,
  })
  avatarUrl: string;

  // NOTE: 要测一下带区号时的效果
  @Column({
    comment: '绑定的手机号',
    nullable: true,
    length: 100,
  })
  phoneNumber: string;

  @Column({
    comment: '用户角色,1-普通用户,6-管理员',
    nullable: true,
    default: 1,
  })
  role: number;

  @Column({
    comment: '管理员用户名',
    nullable: true,
    length: 100,
  })
  @Exclude()
  username: string;

  @Column({
    comment: '管理员密码',
    nullable: true,
    length: 100,
  })
  @Exclude()
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(password || this.password, salt);
    this.role = 6;
  }

  @CreateDateColumn({
    type: 'datetime',
  })
  createdDate: Date;

  @UpdateDateColumn({
    select: false,
    type: 'datetime',
  })
  updatedDate: Date;

  @DeleteDateColumn({
    select: false,
    type: 'datetime',
  })
  deletedDate: Date;
}
