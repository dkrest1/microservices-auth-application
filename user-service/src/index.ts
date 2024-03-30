import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { myDataSource } from "./configs/db.config";
import UserController from "./controllers/user.controller";

class Server {
    private app: express.Application
    private userController: UserController

    constructor() {
        this.app = express()
        this.configuration()
        this.userController = new UserController()
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

        this.app.post(`/login`, this.userController.login);
        this.app.post(`/register`, this.userController.register);
        this.app.get(`/`, this.userController.findAll);
        this.app.get(`/:userId`, this.userController.findOne);
        this.app.patch(`/:userId`, this.userController.update);
        this.app.delete(`/:userId/`, this.userController.delete);
    }

    public async start() {
        try {
            await myDataSource.initialize(); 
            console.log("Database connected successfully 🪐")
            this.app.listen(this.app.get('port'), () => {
                console.log(`User App is live on port ${this.app.get('port')} 🚀🚀🚀`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
}

const server = new Server()

server.start()