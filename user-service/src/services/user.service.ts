import { Repository } from "typeorm";
import { UserEntity } from "@/Entities/user.entity";
import { myDataSource } from "@/configs/db.config";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/helper.util";

export default class UserService {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = myDataSource.getRepository(UserEntity)
    }

    public async register(email: string, username: string, fullname: string, password: string) {

        const existedEmail = await this.userRepository.findOne({where: {email}})

        if(existedEmail) {
            return {status: 400, message: "Bad request, email already existed", data: null}
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = this.userRepository.create({
            email,
            username,
            fullname,
            password: hashedPassword
        })
        
        await this.userRepository.save(user)

        const savedUser = await this.userRepository.findOne({ where: { id: user.id }, select: ['id', 'email', 'username', 'fullname', 'created_at', 'updated_at'] });

        return { status: 200, message: "User registered successfully", data: savedUser};
    }

    public async login(email: string, password: string) {
        const existingUser = await this.userRepository.findOne({where: {email}})
        if(!existingUser) {
            return {status: 400, message: "Bad request, Invalid user", data: null}
        }

        const passwordValid = await bcrypt.compare(password, existingUser.password)
        
        if(!passwordValid) {
            return {status: 400, message: "Bad request, Invalud credentials", data: null}
        }

        const access_token = generateToken({id: existingUser.id, email: existingUser.email})

        const response = await this.userRepository.findOne({ where: { id: existingUser.id }, select: ['id', 'email', 'username', 'fullname', 'created_at', 'updated_at'] });

        return { status: 200, message: "User login successfully", data: {
            user: response,
            access_token
        }};
    }

    public async  findOne(userId: string) {
        const user = await this.userRepository.findOne({where: {id: userId}})
        if(!user) {
            return {status: 400, message: "Bad request, user not found", data: null}
        }

        const response = await this.userRepository.findOne({ where: { id: user.id }, select: ['id', 'email', 'username', 'fullname', 'created_at', 'updated_at'] });

        return { status: 200, message: "Success", data: response};
    }
    
    public async findAll() {
        const users = await this.userRepository.find({ select: ["id", "email", "username", "fullname", "created_at", "updated_at"] });

        return { status: 200, message: "Success", data: users };
    }

    public async update(userId: string, username: string, fullname: string) {
     
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return { status: 404, message: "User not found", data: null };
        }

        user.username = username;
        user.fullname = fullname;
        await this.userRepository.save(user);

        const response = await this.userRepository.findOne({ where: { id: user.id }, select: ['id', 'email', 'username', 'fullname', 'created_at', 'updated_at'] });

        return { status: 200, message: "Success", data: response};

    }

    public async delete(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return { status: 404, message: "User not found", data: null };
        }
        await this.userRepository.delete(userId);

        return { status: 200, message: "User deleted successfully", data: null };
    }
}