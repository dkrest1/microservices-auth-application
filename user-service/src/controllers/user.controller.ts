import UserService from "@/services/user.service";
import { Router, Response, Request } from "express";

export default class UserController {

    public router: Router

    private userService: UserService

    constructor() {
        this.userService = new UserService()
        this.router = Router()
    }

    public register = async (_req: Request, res:Response) => {
        const users = await this.userService.register()
        res.send(users).json()
    }

    public login = async (_req: Request, res:Response) => {
        const users = await this.userService.login()
        res.send(users).json()
    }

    public findOne = async (_req: Request, res:Response) => {
        const users = await this.userService.findOne()
        res.send(users).json()
    }

    public getMany = async (_req: Request, res:Response) => {
        const users = await this.userService.getMany()
        res.send(users).json()
    }

}