import { EntityRepository, Repository } from "typeorm";
import { PaymentEntity } from "@/Entities/payment.entity";

@EntityRepository()
export default class PaymentRepository extends Repository<PaymentEntity> {}