// src/entities/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Medicine } from "./Medecine";


@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;


  @ManyToOne(() => User, (user) => user.id)
  patient?: User;


  @ManyToOne(() => Medicine, (medicine: Medicine) => medicine.id)
  medicine?: Medicine;


  @Column({ type: "int" })
  quantity?: number;


  @Column({ type: "decimal" })
  totalPrice?: number;


  @Column({ type: "enum", enum: ["PENDING", "APPROVED", "COMPLETED"] })
  status?: "PENDING" | "APPROVED" | "COMPLETED";
}