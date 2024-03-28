import PaymentRepository from "@/repositories/payment.repository";
import { getConnection } from "typeorm";

export default class PaymentService {
    private paymentRepository: PaymentRepository

    constructor() {
        this.paymentRepository = getConnection("blog").getCustomRepository(PaymentRepository)
    }

    public async create() {

    }

    public async findOne() {

    }

    public async getMany() {
        const users = await this.paymentRepository.find()
        return users
    }

    public async getPaymentOrder() {
        const users = await this.paymentRepository.find()
        return users
    }

    public async delete() {

    }
    
}