import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";


dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'db',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: ["src/entity/**/*.ts"], 
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
