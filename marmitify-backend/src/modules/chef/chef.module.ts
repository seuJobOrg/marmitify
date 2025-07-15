import { forwardRef, Module } from '@nestjs/common';
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from './chef.entity';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [ChefController],
    providers: [ChefService],
    exports: [ChefService],
    imports: [
        TypeOrmModule.forFeature([Chef]),
        forwardRef(() => UserModule), // Use forwardRef to avoid circular dependency issues
    ],
})
export class ChefModule {}