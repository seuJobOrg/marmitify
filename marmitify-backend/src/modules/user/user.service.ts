import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChefService } from '../chef/chef.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(forwardRef(() => ChefService))
        private readonly chefService: ChefService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email: email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async isChef(id: number): Promise<boolean> {
        const user = await this.findOne(id);
        const chef = await this.chefService.findByUserId(id);
        if (!user || !chef) {
            return false;
        }
        return true;
    }
}   