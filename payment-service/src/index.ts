import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { DBConfig } from "./configs/db.config";
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
        
        this.app.use(`/api/auth/`, this.paymentController.create);
        this.app.use(`/api/auth/`, this.paymentController.findOne);
        this.app.use(`/api/auth/`, this.paymentController.getMany);
        this.app.use(`/api/auth/`, this.paymentController.getPaymentOrder);
        this.app.use(`/api/auth/`, this.paymentController.delete);
    }

    public async start() {
        try {
            await DBConfig.initialize(); 
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