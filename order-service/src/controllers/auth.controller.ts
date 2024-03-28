import { AuthService } from "@/services/auth.service";
import { Router, Response, Request } from "express";

export class AuthController {

    public router: Router

    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
        this.router = Router()
        this.routes()
    }

    public find = async (_req: Request, res:Response) => {
        const users = await this.authService.find()
        res.send(users).json()
    }

    public routes() {

    }

}