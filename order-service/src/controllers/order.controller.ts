import OrderService  from "@/services/order.service";
import { Response, Request } from "express";

export default class OrderController {

    private orderService: OrderService

    constructor() {
        this.orderService = new OrderService()
    }

    public async create(_req: Request, res:Response) {
        const users = await this.orderService.create()
        res.send(users).json()
    }

    public async create(_req: Request, res:Response) {
        const users = await this.orderService.create()
        res.send(users).json()
    }

    public async findOne(_req: Request, res:Response) {
        const users = await this.orderService.findOne()
        res.send(users).json()
    }

    public async getMany(_req: Request, res:Response) {
        const users = await this.orderService.getMany()
        res.send(users).json()
    }

    public async findOrdersProduct(_req: Request, res:Response) {
        const users = await this.orderService.findOrdersProduct()
        res.send(users).json()
    }

    public async findOrsersByUser(_req: Request, res:Response) {
        const users = await this.orderService.findOrdersByUser()
        res.send(users).json()
    }

    public async delete(_req: Request, res:Response) {
        const users = await this.orderService.delete()
        res.send(users).json()
    }

}