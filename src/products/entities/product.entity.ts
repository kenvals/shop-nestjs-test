import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoryShop } from "../enums/type-category-enum";

@Entity("products", {
  synchronize: true,
})
export class ProductEntity {
  @PrimaryGeneratedColumn("increment", {
    type: "bigint",
  })
  id: number;

  @Column({
    default: "",
    nullable: true,
  })
  name: string;

  @Column({
    default: CategoryShop.OTHER,
    nullable:true
  })
  category: string;
}
