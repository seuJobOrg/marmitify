import { Module } from '@nestjs/common';
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from './chef.entity';

@Module({
    controllers: [ChefController],
    providers: [ChefService],
    exports: [ChefService],
    imports: [
        TypeOrmModule.forFeature([Chef]),
    ],
})
export class ChefModule {}