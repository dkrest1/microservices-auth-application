// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from "dotenv";

dotenv.config()

const variables = {
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
    PORT: process.env.PORT as string,
    QUEUE_NAME: process.env.QUEUE_NAME as string,
    CONNECTION_STRING: process.env.CONNECTION_STRING as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION as string
    
}

export default variables