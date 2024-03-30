import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import httpProxy  from "http-proxy";

const proxy = httpProxy.createProxyServer();

class Server {
    private app: express.Application

    constructor() {
        this.app = express()
        this.configuration()
        this.routes()

    }

    public configuration() {
        this.app.set('port', variables.GATEWAY_PORT || 3000)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
    }

    public async routes() {
        // testing route 
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hello world!");
        });
    
        // Route request to the order service
        this.app.use("/api/v2/orders/", (req: Request, res: Response) => {
            proxy.web(req, res, { target: "http://localhost:3001" });
        });
        
        // Route request to the payment service
        this.app.use("/api/v2/payments/", (req: Request, res: Response) => {
            proxy.web(req, res, { target: "http://product:3002" });
        });
        
        // Route request to the product service
        this.app.use("/api/v2/products/", (req: Request, res: Response) => {
            proxy.web(req, res, { target: "http://order:3003" });
        });
    
        // Route request to the user service
        this.app.use("/api/v2/users/", (req: Request, res: Response) => {
            proxy.web(req, res, { target: "http://order:3004" });
        });
    }

    public async start() {
        try {
            this.app.listen(this.app.get('port'), () => {
                console.log(`App Gateway is live on port ${this.app.get('port')} 🚀🚀🚀`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
}

const server = new Server()

server.start()