import { UserRepository } from "@/repositories/user.repository";
import { getConnection } from "typeorm";

export class AuthService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = getConnection("blog").getCustomRepository(UserRepository)
    }

    public create() {

    }

    public get() {

    }

    public delete() {

    }
    
    public find = async () => {
        const users = await this.userRepository.find()
        return users
    }
}