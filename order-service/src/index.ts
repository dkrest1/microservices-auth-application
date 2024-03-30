import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { myDataSource } from "./configs/db.config";
import OrderController from "./controllers/order.controller";

class Server {
    private app: express.Application
    private orderController: OrderController

    constructor() {
        this.app = express()
        this.configuration()
        this.orderController = new OrderController()
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

        this.app.post(`/create`, this.orderController.create);
        this.app.get(`/:orderId`, this.orderController.findOne);
        this.app.get(`/`, this.orderController.findAll);
        this.app.patch(`/:orderId`, this.orderController.update);
        this.app.get(`/:orderId/status`, this.orderController.getOrderStatus);
        this.app.get(`/:orderId/users/:userId`, this.orderController.getOrdersByUser);
        this.app.get(`/:orderId/products/:productId`, this.orderController.getProductOrders);
        this.app.delete(`/:orderId`, this.orderController.delete);
    }

    public async start() {
        try {
            await myDataSource.initialize(); 
            console.log("Database connected successfully 🪐")
            this.app.listen(this.app.get('port'), () => {
                console.log(`Order App is live on port ${this.app.get('port')} 🚀🚀🚀`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
}

const server = new Server()

server.start()