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

    public async findAll(_req: Request, res:Response) {
        const users = await this.paymentService.findAll()
        res.send(users).json()
    }

    public async getPaymentTransactionId(_req: Request, res:Response) {
        const users = await this.paymentService.getPaymentTransactionId()
        res.send(users).json()
    }

    public async getPaymentStatus(_req: Request, res:Response) {
        const users = await this.paymentService.getPaymentStatus()
        res.send(users).json()
    }

    public async getPaymentByOrderId(_req: Request, res:Response) {
        const users = await this.paymentService.getPaymentByOrderId()
        res.send(users).json()
    }

    public async delete(_req: Request, res:Response) {
        const users = await this.paymentService.delete()
        res.send(users).json()
    }

}