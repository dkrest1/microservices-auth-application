// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from "dotenv";

dotenv.config()

const variables = {
    GATEWAY_PORT: process.env.GATEWAY_PORT as string
}

export default variables