import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { DBConfig } from "./configs/db.config";
import  ProductController  from "./controllers/product.controller";

class Server {
    private app: express.Application
    private productController: ProductController

    constructor() {
        this.app = express()
        this.configuration()

        this.productController = new ProductController()
        this.routes()

    }

    public configuration() {
        this.app.set('port', variables.PORT || 3001)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
    }

    public async routes() {
        // testing route 
        this.app.get( "/", (req: Request, res: Response ) => {
            res.send( "Hello world!" );
        });

        this.app.use(`/api/auth/`, this.productController.create);
        this.app.use(`/api/auth/`, this.productController.findOne);
        this.app.use(`/api/auth/`, this.productController.getMany);
        this.app.use(`/api/auth/`, this.productController.delete);
    }

    public async start() {
        try {
            await DBConfig.initialize(); 
            console.log("Database connected successfully 🪐")
            this.app.listen(this.app.get('port'), () => {
                console.log(`Product App is live on port ${this.app.get('port')} 🚀🚀🚀`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
}

const server = new Server()

server.start()