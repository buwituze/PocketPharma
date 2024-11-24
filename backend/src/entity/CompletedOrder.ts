// src/entities/CompletedOrder.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Medicine } from "./Medecine";

@Entity({ name: "completed_orders" })
export class CompletedOrder {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.id)
  patient?: User;

  @ManyToOne(() => Medicine, (medicine) => medicine.id)
  medicine?: Medicine;

  @Column({ type: "int" })
  quantity?: number;

  @Column({ type: "decimal" })
  totalPrice?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  completedAt?: Date;
}