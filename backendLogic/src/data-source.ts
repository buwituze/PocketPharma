import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";


dotenv.config(); // Load environment variables from .env


export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'db', // Update this line to use the 'db' hostname
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: ["src/entity/**/*.ts"], // Or "src/entities/**/*.ts" if using `entities`
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
