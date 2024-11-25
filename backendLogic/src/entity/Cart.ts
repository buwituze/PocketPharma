// src/entities/Cart.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";


@Entity({ name: "carts" })
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number;


  // Many carts can belong to one user
  @ManyToOne(() => User, (user) => user.carts, { nullable: false })
user?: User;


  // A cart can have multiple items
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items?: CartItem[];


  // Total price of the cart (calculated based on items)
  @Column({ type: "decimal", default: 0 })
  totalPrice?: number;


  // Whether the cart has been checked out
  @Column({ type: "boolean", default: false })
  checkedOut?: boolean;
}
