import { Repository } from "typeorm";
import { PaymentEntity } from "@/Entities/payment.entity";
import { myDataSource } from "@/configs/db.config"
export default class PaymentService {

    private paymentRepository: Repository<PaymentEntity>;

    constructor() {
        this.paymentRepository = myDataSource.getRepository(PaymentEntity)
    }

    public async create() {

    }

    public async findOne() {

    }

    public async findAll() {
        const users = await this.paymentRepository.find()
        return users
    }

    public async getPaymentByOrderId() {
        const users = await this.paymentRepository.find()
        return users
    }

    public async getPaymentTransactionId() {

    }

    public async getPaymentStatus() {

    }

    public async delete() {

    }
}