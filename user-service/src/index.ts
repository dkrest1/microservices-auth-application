import "module-alias/register";
import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { myDataSource } from "./configs/db.config";
import UserController from "./controllers/user.controller";
import UserValidator from "./validators/user.validator";
import isAuthenticated from "./middlewares/auth.middleware";

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

        this.app.post(`/login`, UserValidator.validateLogin, this.userController.login.bind(this.userController));
        this.app.post(`/register`, UserValidator.validateRegister, this.userController.register.bind(this.userController));
        this.app.get(`/all`, isAuthenticated, this.userController.findAll.bind(this.userController));
        this.app.get(`/:userId/`, isAuthenticated, UserValidator.validateID, this.userController.findOne.bind(this.userController));
        this.app.patch(`/:userId`, isAuthenticated,  UserValidator.validateID, UserValidator.validateUpdate, this.userController.update.bind(this.userController));
        this.app.delete(`/:userId/`, isAuthenticated, UserValidator.validateID, this.userController.delete.bind(this.userController));
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