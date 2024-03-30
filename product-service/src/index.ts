import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { myDataSource} from "./configs/db.config";
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

        this.app.post(`/create`, this.productController.create);
        this.app.get(`/:productId`, this.productController.findOne);
        this.app.get(`/`, this.productController.findAll);
        this.app.patch(`/:productId`, this.productController.updateOne);
        this.app.delete(`/:productId`, this.productController.delete);
    }

    public async start() {
        try {
            await myDataSource.initialize(); 
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