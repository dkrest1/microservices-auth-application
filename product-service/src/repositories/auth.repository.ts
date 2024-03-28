import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@/Entities/product.entity";

@EntityRepository()
export class UserRepository extends Repository<UserEntity> {}