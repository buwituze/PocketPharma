// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type UserRole = "ADMIN" | "PATIENT" | "PHARMACY";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 50 })
  firstName?: string;

  @Column({ type: "varchar", length: 50 })
  lastName?: string;

  @Column({ type: "varchar", unique: true })
  username?: string;

  @Column({ type: "varchar", unique: true })
  email?: string;

  @Column({ type: "varchar" })
  password?: string;

  @Column({ type: "varchar", nullable: true })
  nationalId?: string;
  @Column({ type: "varchar", nullable: true })
  licenseNumber?: string;

  @Column({ type: "varchar" })
  phoneNumber?: string;

  @Column({ type: "enum", enum: ["ADMIN", "PATIENT", "PHARMACY"] })
  role?: UserRole;
}