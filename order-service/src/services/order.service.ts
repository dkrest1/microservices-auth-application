import { Repository } from "typeorm";
import { OrderEntity } from "@/Entities/order.entity";
import { myDataSource } from "@/configs/db.config";

export default class OrderService {
    private orderRepository: Repository<OrderEntity>;

    constructor() {
        this.orderRepository = myDataSource.getRepository(OrderEntity)
    }

    public async create() {

    }

    public async findOne() {

    }

    public async findAll(){
        const users = await this.orderRepository.find()
        return users
    }

    public async update(){

    }

    public async getOrdersByUser(){
        const users = await this.orderRepository.find()
        return users
    }

    public async getOrderStatus(){
    
        const users = await this.orderRepository.find()
        return users
    }

    public async getProductOrders(){
        const users = await this.orderRepository.find()
        return users
    }

    public async delete() {

    }
    
}