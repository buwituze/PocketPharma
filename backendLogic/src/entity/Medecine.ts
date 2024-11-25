// src/entities/Medicine.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: "medicines" })
export class Medicine {
  @PrimaryGeneratedColumn()
  id?: number;


  @Column({ type: "varchar" })
  name?: string;


  @Column({ type: "varchar" })
  picture?: string;


  @Column({ type: "varchar" })
  category?: string;


  @Column({ type: "decimal" })
  amount?: number;


  @Column({ type: "varchar" })
  sideEffects?: string;


  @Column({ type: "enum", enum: ["OTC", "PRESCRIPTION"] })
  type?: "OTC" | "PRESCRIPTION";  
 
  @Column({ type: "text" })
  description?: string;
}
