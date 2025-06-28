import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from './chef.entity';
import { CreateChefDto } from './dto/create-chef-dto';
import { UpdateChefDto } from './dto/update-chef-dto';

@Injectable()
export class ChefService {
    constructor(
        @InjectRepository(Chef)
        private readonly chefRepository: Repository<Chef>,
    ) {}

    async create(createChefDto: CreateChefDto): Promise<Chef> {
        const chef = this.chefRepository.create(createChefDto);
        return await this.chefRepository.save(chef);
    }

    async findAll(): Promise<Chef[]> {
        return await this.chefRepository.find();
    }

    async findOne(id: number): Promise<Chef> {
        const chef = await this.chefRepository.findOne({ where: { id } });
        if (!chef) {
            throw new NotFoundException(`Chef with ID ${id} not found`);
        }
        return chef;
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