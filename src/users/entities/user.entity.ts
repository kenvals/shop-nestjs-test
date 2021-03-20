import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity("users", {
  synchronize: true,
})
export class UserEntity {
  @PrimaryGeneratedColumn("increment", {
    type: "bigint",
  })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  async getPasswordHash?() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

