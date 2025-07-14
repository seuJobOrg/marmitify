import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register-dto';
import { ChefService } from '../chef/chef.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private chefeService: ChefService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const result = {
                id: user.id,
                email: user.email,
                name: user.name,
            };
            return result;
        }
        return null;
    }

    async login(user: any) {
        try {
            const payload = await this.validateUser(user.email, user.password);
            const token = await this.jwtService.signAsync(payload);
            const chef = await this.chefeService.findByUserId(payload.id);
            return {
                access_token: token,
                user: {
                    id: payload.id,
                    email: payload.email,
                    name: payload.name,
                    chef: chef,
                },
            };
        } catch (error) {
            Logger.error('Error during login', error);
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({
            email: registerDto.email,
            password: hashedPassword,
            name: registerDto.name,
        });

        if (user)
            return this.login({ email: registerDto.email, password: registerDto.password});

        throw new UnauthorizedException('Registration failed');
    }
}