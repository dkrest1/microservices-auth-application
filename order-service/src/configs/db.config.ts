import { DataSource } from "typeorm"
import variables from "./constants.config"
import { OrderEntity } from "@/Entities/order.entity"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: variables.DB_USER,
    password: variables.DB_PASSWORD,
    database: variables.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [OrderEntity],
    subscribers: [],
    migrations: [],
})