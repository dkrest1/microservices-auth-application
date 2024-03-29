import { EntityRepository, Repository } from "typeorm";
import { ProductEntity } from "@/Entities/product.entity";

@EntityRepository()
export default class ProductRepository extends Repository<ProductEntity> {}