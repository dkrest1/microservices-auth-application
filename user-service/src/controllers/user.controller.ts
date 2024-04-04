import UserService from "@/services/user.service";
import { Router } from "express";
import { _Request, _Response } from "@/types";

export default class UserController {

    public router: Router

    private userService: UserService

    constructor() {
        this.userService = new UserService()
        this.router = Router()
    }

    public async register (req: _Request, res: _Response) {

        try {
            const { email, username, fullname, password } = req.body;
            const response = await this.userService.register(email, username, fullname, password);
            res.status(response.status).json(response);
        } catch (error: any) {
            console.error("Error registering user:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    
    }

    public async login(req: _Request, res: _Response) {

        try {
            const {email, password} = req.body
            const response = await this.userService.login(email, password)
            res.status(response.status).json(response);
        }catch(error: any) {
            console.error("Error logging user:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }

    }

    public async findOne(req: _Request, res: _Response) {
        const userId = req.params.userId

        try {
            const response = await this.userService.findOne(userId)
            res.status(response.status).json(response);
        }catch(error) {
            console.error("Error finding a user:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }


    }

    public async findAll(req: _Request, res: _Response) {
        try {
            const response = await this.userService.findAll()
            res.status(response.status).json(response);
        }catch(error) {
            console.error("Error finding users:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

    public async update(req: _Request, res: _Response) {
        try {
            const userId = req.user.id;
            const userParamsId = req.params.userId;
            const { username, fullname } = req.body;

            if (userId !== userParamsId) {
                return res.status(403).json({ status: 403, message: "Access denied, invalid user", data: null });
            }
    
            const response = await this.userService.update(userParamsId, username, fullname);
            return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error updating a user:", error);
            return res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

    public async delete(req: _Request, res:_Response) {
        const userId = req.user.id;
        const userParamsId = req.params.userId;

        if (userId !== userParamsId) {
            return res.status(403).json({ status: 403, message: "Access denied, invalid user", data: null });
        }
        try {
            const response = await this.userService.delete(userParamsId)
            res.status(response.status).json(response);
        }catch(error) {
            console.error("Error deleting a user:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

}