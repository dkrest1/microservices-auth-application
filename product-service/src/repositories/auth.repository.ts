import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@/Entities/user.entity";

@EntityRepository()
export class UserRepository extends Repository<UserEntity> {}