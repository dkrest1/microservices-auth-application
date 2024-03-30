import { Repository } from "typeorm";
import { UserEntity } from "@/Entities/user.entity";
import { myDataSource } from "@/configs/db.config";

export default class UserService {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = myDataSource.getRepository(UserEntity)
    }

    public async register() {

    }

    public async login() {

    }

    public async  findOne() {

    }
    
    public async findAll () {
        const users = await this.userRepository.find()
        return users
    }

    public async update() {

    }

    public async delete() {

    }
}