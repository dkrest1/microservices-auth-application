import PaymentService from "@/services/payment.service";
import { Response, Request } from "express";

export default class PaymentController {

    private paymentService: PaymentService

    constructor() {
        this.paymentService = new PaymentService()
    }

    public async create(_req: Request, res:Response) {
        const users = await this.paymentService.create()
        res.send(users).json()
    }

    public async findOne(_req: Request, res:Response) {
        const users = await this.paymentService.findOne()
        res.send(users).json()
    }

    public async getMany(_req: Request, res:Response) {
        const users = await this.paymentService.getMany()
        res.send(users).json()
    }

    public async getPaymentOrder(_req: Request, res:Response) {
        const users = await this.paymentService.getPaymentOrder()
        res.send(users).json()
    }

    public async delete(_req: Request, res:Response) {
        const users = await this.paymentService.delete()
        res.send(users).json()
    }

   

}