import { Repository } from "typeorm";
import { ProductEntity } from "../configs/Entities/product.entity";
import { myDataSource } from "@/configs/db.config";
import MessageBroker from "@/message-broker";
import variables from "@/configs/constants.config";

export default class ProductService {
    private productRepository: Repository<ProductEntity>;
    private messageBroker: MessageBroker

    constructor() {
        this.productRepository = myDataSource.getRepository(ProductEntity)
        this.initializeServices();
    }


    private async initializeServices() {
        try {
            await this.initMessageBroker();
            this.consumeProductDetailsRequest();
        } catch (error) {
            console.error("Error initializing services:", error);
        }
    }

    private async initMessageBroker() {
        try {
            this.messageBroker = await MessageBroker.connect(variables.CONNECTION_STRING, variables.QUEUE_NAME);
        } catch (error) {
            console.error("Error connecting to message broker:", error);
        }
    }

    public async create(name: string, description: string, price: string) {
        
        const newProduct = this.productRepository.create({
            name,
            description,
            price: parseFloat(price)
        });

        const createdProduct = await this.productRepository.save(newProduct);
        
        return { status: 201, message: "Product created successfully", data: createdProduct };
    }

    public async findOne(productId: string) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            return { status: 400, message: "Product not found", data: null };
        }
        return { status: 200, message: "Success", data: product };
    }

    public async findAll() {
        const products = await this.productRepository.find();

        return { status: 200, message: "Success", data: products };
    }

    public async updateOne(productId: string, name: string, description: string, price: number) {
        const product = await this.productRepository.findOne({where: {id: productId}});

        if (!product) {
            return { status: 404, message: "Product not found", data: null };
        }

        product.name = name;
        product.description = description;
        product.price = price;

        await this.productRepository.save(product);

        return { status: 200, message: "Product updated successfully", data: product };
    }

    public async delete(productId: string) {
        const product = await this.productRepository.findOne({where: {id: productId}});

        if (!product) {
            return { status: 404, message: "Product not found", data: null };
        }

        await this.productRepository.delete(productId);

        return { status: 200, message: "Product deleted successfully", data: null };
    }

    public async consumeProductDetailsRequest() {
        try {
            await this.messageBroker.consumeMessage('PRODUCT_DETAILS_REQUEST', async (message) => {
                const { productId } = message;
                console.log(`Received product details request for product ID: ${productId}`);
                
                // Retrieve product details from the database based on the productId
                const product = await this.productRepository.findOne({ where: { id: productId } });
    
                if (!product) {
                    console.error(`Product with ID ${productId} not found.`);
                    return;
                }
    
                // Publish product details as response
                await this.publishProductDetails(
                    product.id,
                    product.name,
                    product.description,
                    product.price
                );
            });
        } catch (error) {
            console.error('Error consuming product details request:', error);
            throw error;
        }
    }
    

    public async publishProductDetails(productId: string, name: string, description: string, price: number) {
        try {
            const event = {
                type: 'PRODUCT_DETAILS_RESPONSE',
                productId,
                name,
                description,
                price,
            };
    
            await this.messageBroker.publishMessage('PRODUCT_DETAILS_RESPONSE', event);
            console.log('Product details published:', event);
        } catch (error) {
            console.error('Error publishing product details:', error);
            throw error;
        }
    }
}