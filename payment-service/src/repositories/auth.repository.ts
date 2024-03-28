import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@/Entities/payment.entity";

@EntityRepository()
export class UserRepository extends Repository<UserEntity> {}