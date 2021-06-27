import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
export class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  @JoinColumn({ name: "user_sender" })
  @ManyToOne(() => User)
  user_sender: string;
  userSender: User;

  @Column()
  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  user_receiver: string;
  userReceiver: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
