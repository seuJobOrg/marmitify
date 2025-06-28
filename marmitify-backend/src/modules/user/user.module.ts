import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Assuming UserService is an entity, otherwise replace with the correct entity
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        TypeOrmModule, // Exporting TypeOrmModule to make it available in other modules
    ]
})
export class UserModule {}