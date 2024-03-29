import UserRepository from "@/repositories/user.repository";
import { getConnection } from "typeorm";

export default class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = getConnection("blog").getCustomRepository(UserRepository)
    }

    public async register() {

    }

    public async login() {

    }

    public async  findOne() {

    }
    
    public async getMany () {
        const users = await this.userRepository.find()
        return users
    }
}