import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ChefService } from './chef.service';
import { CreateChefDto } from './dto/create-chef-dto';
import { UpdateChefDto } from './dto/update-chef-dto';

@Controller('chefs')
export class ChefController {
    constructor(private readonly chefService: ChefService) {}

    @Post('')
    create(@Body() createChefDto: CreateChefDto) {
        return this.chefService.create(createChefDto);
    }

    @Get()
    findAll() {
        return this.chefService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: number) {
        return this.chefService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateChefDto: UpdateChefDto) {
        return this.chefService.update(id, updateChefDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.chefService.remove(id);
    }
}