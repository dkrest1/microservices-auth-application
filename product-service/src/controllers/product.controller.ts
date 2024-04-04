import ProductService  from "@/services/product.service";
import { _Request, _Response } from "@/types";
export default class ProductController {

    private productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    public async create(req: _Request, res: _Response) {

        try {
            const { name, description, price} = req.body;
            const response = await this.productService.create(name, description, price);
            res.status(response.status).json(response);
        } catch (error: any) {
            console.error("Error registering a product:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    
    }

    public async findOne(req: _Request, res: _Response) {

        try {
            const { productId} = req.params;
            const response = await this.productService.findOne(productId);
            res.status(response.status).json(response);
        } catch (error: any) {
            console.error("Error finding a product:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

    public async findAll(req: _Request, res: _Response) {

       try {
            const response = await this.productService.findAll()
            res.status(response.status).json(response);
        }catch(error) {
            console.error("Error finding products:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

    public async updateOne(req: _Request, res: _Response) {

        try {
            const productId = req.params.productId
            const {name, description, price} = req.body
            const response = await this.productService.updateOne(productId, name, description, price)
            res.status(response.status).json(response);
        }catch(error) {
            console.error("Error updating a product:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

    public async delete(req: _Request, res: _Response) {
        const productId = req.params.productId;

        try {
            const response = await this.productService.delete(productId)
            res.status(response.status).json(response);
        }catch(error) {
            console.error("Error deleting a product:", error);
            res.status(500).json({ status: 500, message: "Internal server error", data: null });
        }
    }

}