// src/entities/CartItem.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Cart } from "./Cart";
import { Medicine } from "./Medecine";


@Entity({ name: "cart_items" })
export class CartItem {
  @PrimaryGeneratedColumn()
  id?: number;


  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: false })
  cart?: Cart;


  @ManyToOne(() => Medicine, (medicine) => medicine.id, { nullable: false })
  medicine?: Medicine;


  @Column({ type: "int" })
  quantity?: number;


  @Column({ type: "decimal" })
  price?: number;
}
