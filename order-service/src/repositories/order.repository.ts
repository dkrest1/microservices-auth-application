import { EntityRepository, Repository } from "typeorm";
import { OrderEntity } from "@/Entities/order.entity";

@EntityRepository()
export default class OrderRepository extends Repository<OrderEntity> {}