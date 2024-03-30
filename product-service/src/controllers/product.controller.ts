import ProductService  from "@/services/product.service";
import { Response, Request } from "express";

export default class ProductController {


    private productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    public async create(_req: Request, res:Response) {
        const users = await this.productService.create()
        res.send(users).json()
    }

    public async findOne(_req: Request, res:Response) {
        const users = await this.productService.findOne()
        res.send(users).json()
    }

    public async findAll(_req: Request, res:Response) {
        const users = await this.productService.findAll()
        res.send(users).json()
    }

    public async updateOne(_req: Request, res:Response) {
        const users = await this.productService.updateOne()
        res.send(users).json()
    }

    public async delete(_req: Request, res:Response) {
        const users = await this.productService.delete()
        res.send(users).json()
    }

}