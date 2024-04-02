import OrderService  from "@/services/order.service";
import { Response, Request } from "express";



export default class OrderController {

    private orderService: OrderService

    constructor() {
        this.orderService = new OrderService()
    }

    public async create(req: Request, res:Response) {
        const users = await this.orderService.create()
        res.send(users).json()
    }

    public async findOne(_req: Request, res:Response) {
        const users = await this.orderService.findOne()
        res.send(users).json()
    }

    public async findAll(_req: Request, res:Response) {
        const users = await this.orderService.findAll()
        res.send(users).json()
    }

    public async update(_req: Request, res:Response) {
        const users = await this.orderService.update()
        res.send(users).json()
    }

    public async getOrderStatus(_req: Request, res:Response) {
        const users = await this.orderService.getOrderStatus()
        res.send(users).json()
    }

    public async getOrdersByUser(_req: Request, res:Response) {
        const users = await this.orderService.getOrdersByUser()
        res.send(users).json()
    }

    public async getProductOrders(_req: Request, res:Response) {
        const users = await this.orderService.getProductOrders()
        res.send(users).json()
    }

    public async delete(_req: Request, res:Response) {
        const users = await this.orderService.delete()
        res.send(users).json()
    }

}