import { Repository } from "typeorm";
import { ProductEntity } from "../Entities/product.entity";
import { myDataSource } from "@/configs/db.config";

export default class ProductService {
    private productRepository: Repository<ProductEntity>;

    constructor() {
        this.productRepository = myDataSource.getRepository(ProductEntity)
    }

    public async create() {

    }

    public async findOne() {
        const users = await this.productRepository.find()
        return users
    }

    public async findAll() {

    }

    public async updateOne() {

    }

    public async delete() {

    }

}