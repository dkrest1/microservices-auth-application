import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@/Entities/user.entity";

@EntityRepository()
export default class UserRepository extends Repository<UserEntity> {}