import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products", {
  synchronize: true,
})
export class Product {
  @PrimaryGeneratedColumn("increment", {
    type: "bigint",
  })
  id: number;

  @Column({
    default: "",
    nullable: true,
  })
  name: string;
}
