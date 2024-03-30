import UserService from "@/services/user.service";
import { Router, Response, Request } from "express";

export default class UserController {

    public router: Router

    private userService: UserService

    constructor() {
        this.userService = new UserService()
        this.router = Router()
    }

    public async register (_req: Request, res:Response) {
        const users = await this.userService.register()
        res.send(users).json()
    }

    public async login(_req: Request, res:Response) {
        const users = await this.userService.login()
        res.send(users).json()
    }

    public async findOne(_req: Request, res:Response) {
        const users = await this.userService.findOne()
        res.send(users).json()
    }

    public async findAll(_req: Request, res:Response) {
        const users = await this.userService.findAll()
        res.send(users).json()
    }

    public async update(_req: Request, res:Response) {
        const users = await this.userService.delete()
        res.send(users).json()
    }

    public async delete(_req: Request, res:Response) {
        const users = await this.userService.delete()
        res.send(users).json()
    }

    

}