import { Repository } from "typeorm";
import { OrderEntity } from "@/Entities/order.entity";
import { myDataSource } from "@/configs/db.config";
import MessageBroker from "@/message-broker";
import variables from "@/configs/constants.config";

export default class OrderService {
    private orderRepository: Repository<OrderEntity>;
    private messageBroker: MessageBroker

    constructor() {
        this.orderRepository = myDataSource.getRepository(OrderEntity)
        this.initMessageBroker();
    }

    private async initMessageBroker() {
        try {
            this.messageBroker = await MessageBroker.connect(variables.CONNECTION_STRING, variables.QUEUE_NAME);
        } catch (error) {
            console.error("Error connecting to message broker:", error);
        }
    }

    private async requestProductDetails(productIds: string | string[]) {

        const ids = Array.isArray(productIds) ? productIds : [productIds];

        try {
            for (const productId of ids) {
                const message = {
                    productId,
                };
                await this.messageBroker.publishMessage('PRODUCT_DETAILS_REQUEST', message);
                console.log(`Product details request sent for product ID: ${productId}`);
            }
        } catch (error) {
            console.error('Error publishing product details request:', error);
            throw error;
        }
    }
    

    public async create(userId: string, productIds: string[]) {
        // publish a message to get product details 
        await this.requestProductDetails(productIds)
        //get product details
        const productDetails = await new Promise((resolve, _reject) => {
            this.messageBroker.consumeMessage('PRODUCT_DETAILS_RESPONSE', (message) => {
                console.log('Received product details:', message);
                resolve(message); 
            });
        });

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