import { DataSource } from "typeorm"

export const DBConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})