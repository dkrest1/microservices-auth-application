import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { myDataSource} from "./configs/db.config";
import  ProductController  from "./controllers/product.controller";
import ProductValidator from "./validators/product.validator";
import isAuthenticated from "./middlewares/auth.middleware";

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

        this.app.post(`/create`, isAuthenticated, ProductValidator.validateCreateProduct, this.productController.create.bind(this.productController));
        this.app.get(`/all`, isAuthenticated, this.productController.findAll.bind(this.productController));
        this.app.get(`/:productId`, isAuthenticated, ProductValidator.validateID,  this.productController.findOne.bind(this.productController));
        this.app.patch(`/:productId`, this.productController.updateOne.bind(this.productController));
        this.app.delete(`/:productId`, this.productController.delete.bind(this.productController));
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