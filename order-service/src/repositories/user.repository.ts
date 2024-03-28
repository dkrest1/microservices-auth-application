import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@/Entities/order.entity";

@EntityRepository()
export class UserRepository extends Repository<UserEntity> {}