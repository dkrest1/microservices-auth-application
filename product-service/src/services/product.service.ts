import ProductRepository from "@/repositories/product.repository";
import { getConnection } from "typeorm";

export default class ProductService {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = getConnection("blog").getCustomRepository(ProductRepository)
    }

    public async create() {

    }

    public async findOne() {
        const users = await this.productRepository.find()
        return users
    }

    public async getMany() {

    }

    public async delete() {

    }

}