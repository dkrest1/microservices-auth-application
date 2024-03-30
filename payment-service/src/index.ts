import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { myDataSource } from "./configs/db.config";
import PaymentController from "./controllers/payment.controller";

class Server {
    private app: express.Application
    private paymentController: PaymentController

    constructor() {
        this.app = express()
        this.configuration()
        this.paymentController =  new PaymentController()
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
        
        this.app.post(`/create`, this.paymentController.create);
        this.app.get(`/:paymentId`, this.paymentController.findOne);
        this.app.get(`/`, this.paymentController.findAll);
        this.app.get(`/orders/:orderId`, this.paymentController.getPaymentByOrderId);
        this.app.get(`/paymentId/status`, this.paymentController.getPaymentStatus);
        this.app.get(`/transactions/:transactionId`, this.paymentController.getPaymentTransactionId);
        this.app.delete(`/:paymentId`, this.paymentController.delete);
    }

    public async start() {
        try {
            await myDataSource.initialize(); 
            console.log("Database connected successfully 🪐")
            this.app.listen(this.app.get('port'), () => {
                console.log(`Payment App is live on port ${this.app.get('port')} 🚀🚀🚀`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
}

const server = new Server()

server.start()