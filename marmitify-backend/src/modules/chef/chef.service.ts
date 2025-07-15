import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from './chef.entity';
import { CreateChefDto } from './dto/create-chef-dto';
import { UpdateChefDto } from './dto/update-chef-dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ChefService {
    constructor(
        @InjectRepository(Chef)
        private readonly chefRepository: Repository<Chef>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    async create(createChefDto: CreateChefDto): Promise<Chef> {
        const user = await this.userService.findByEmail(createChefDto.email);
        if (!user) {
            throw new NotFoundException(`User with email ${createChefDto.email} not found`);
        }
        const chef = this.chefRepository.create({
            user,
            phone: createChefDto.phone,
            description: createChefDto.description,
            address: createChefDto.address,
        });
        return await this.chefRepository.save(chef);
    }

    async findAll(): Promise<Chef[]> {

        return await this.chefRepository.createQueryBuilder('chef')
            .select(['chef', 'user.id', 'user.email', 'user.name'])
            .leftJoin('chef.user', 'user')
            .getMany();
    }

    async findOne(id: number): Promise<Chef> {
        const chef = await this.chefRepository.createQueryBuilder('chef')
            .select(['chef', 'user.id', 'user.email', 'user.name'])
            .leftJoin('chef.user', 'user')
            .where('chef.id = :id', { id })
            .getOne();
        if (!chef) {
            throw new NotFoundException(`Chef with ID ${id} not found`);
        }
        return chef;
    }

    async findByUserId(userId: number): Promise<Chef[]> {
        return await this.chefRepository.find({ where: { user: { id: userId } } });
    }

    async update(id: number, updateChefDto: UpdateChefDto): Promise<Chef> {
        await this.findOne(id);
        await this.chefRepository.update(id, updateChefDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const chef = await this.findOne(id);
        await this.chefRepository.remove(chef);
    }
}