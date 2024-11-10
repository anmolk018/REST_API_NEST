import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,

    ) { }
    async findUserByEmail(email: string): Promise<Users | undefined> {
        return this.userRepository.findOne({ where: { email } })
    }

    async saveUser(user: CreateUserDto): Promise<Users | undefined> {
        return this.userRepository.save(user);
    }

    async findAllUsers(): Promise<Users[] | undefined> {
        return this.userRepository.find({
            select: ['id', 'name', 'email', 'organization']
        });
    }


}
