// src/entities/Cart.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Medicine } from "./Medecine";

@Entity({ name: "carts" })
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.id)
  user?: User;

  @ManyToOne(() => Medicine, (medicine) => medicine.id)
  medicine?: Medicine;

  @Column({ type: "int" })
  quantity?: number;

  @Column({ type: "decimal" })
  totalPrice?: number;

  @Column({ type: "boolean", default: false })
  checkedOut?: boolean;
}