import OrderService  from "@/services/order.service";
import { _Request, _Response } from "@/types";

export default class OrderController {

    private orderService: OrderService

    constructor() {
        this.orderService = new OrderService()
    }

    public async create(req: _Request, res: _Response) {
        try {
            const userId = req.user.id
            const {productIds } = req.body; 
            const order = await this.orderService.create(userId, productIds);
            res.status(201).json({ success: true, message: 'Order created successfully', data: order });
        } catch (error: any) {
            console.error("Error creating order:", error);
            res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
    }

    public async findOne(req: _Request, res: _Response) {
        const users = await this.orderService.findOne()
        res.send(users).json()
    }

    public async findAll(req: _Request, res: _Response) {
        const users = await this.orderService.findAll()
        res.send(users).json()
    }

    public async update(req: _Request, res: _Response) {
        const users = await this.orderService.update()
        res.send(users).json()
    }

    public async getOrderStatus(req: _Request, res: _Response) {
        const users = await this.orderService.getOrderStatus()
        res.send(users).json()
    }

    public async getOrdersByUser(req: _Request, res: _Response) {
        const users = await this.orderService.getOrdersByUser()
        res.send(users).json()
    }

    public async getProductOrders(req: _Request, res: _Response) {
        const users = await this.orderService.getProductOrders()
        res.send(users).json()
    }

    public async delete(req: _Request, res: _Response) {
        const users = await this.orderService.delete()
        res.send(users).json()
    }

}