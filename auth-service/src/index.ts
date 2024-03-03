import express, {Request, Response} from "express";
import variables from "./configs/constants.config";

class Server {
    private app: express.Application

    constructor() {
        this.app = express()
        this.configuration()
        this.routes()

    }

    public configuration() {
        this.app.set('port', variables.PORT || 3001)
    }

    public routes() {


        // testing route 
        this.app.get( "/", (req: Request, res: Response ) => {
            res.send( "Hello world!" );
        });

        // this.app.use(`/api/auth/`,this.postController.router);
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`app is live on port ${this.app.get('port')} 🚀🚀🚀`)
        })
    }
}

const server = new Server()

server.start()