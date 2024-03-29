import OrderRepository from "@/repositories/order.repository";
import { getConnection } from "typeorm";

export default class OrderService {
    private orderRepository: OrderRepository

    constructor() {
        this.orderRepository = getConnection("blog").getCustomRepository(OrderRepository)
    }

    public async create() {

    }

    public async findOne() {

    }

    public async getMany(){
        const users = await this.orderRepository.find()
        return users
    }

    public async findOrdersProduct(){
        const users = await this.orderRepository.find()
        return users
    }

    public async findOrdersByUser(){
        const users = await this.orderRepository.find()
        return users
    }

    public async delete() {

    }
    
}