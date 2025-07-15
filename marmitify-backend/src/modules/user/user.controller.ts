import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.findAll();
            return users;
        } catch (error) {
            return error.message;
        }
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.userService.findOne(parseInt(req.params.id));
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(req: Request, res: Response) {
        try {
            const updatedUser = await this.userService.update(parseInt(req.params.id), req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(req: Request, res: Response) {
        try {
            if (!await this.userService.findOne(parseInt(req.params.id))) {
                return res.status(404).json({ message: 'User not found' });
            }
            await this.userService.remove(parseInt(req.params.id));
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @Get('/:id/is-chef')
    @UseGuards(AuthGuard('jwt'))
    async userHasChef(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const isChef = await this.userService.isChef(userId);
            return res.status(200).json({ isChef });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}