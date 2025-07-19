import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChefModule } from './modules/chef/chef.module';
import { ClientModule } from './modules/client/client.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      url: process.env.POSTGRES_URL || 'postgres://postgres:1234@localhost:5432/marmitify',
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1234',
      database: process.env.POSTGRES_DATABASE || 'marmitify',
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      autoLoadEntities: true, // Automatically load entities
    }),
    PrometheusModule.register(),
    UserModule,
    ChefModule,
    ClientModule,
    AppointmentModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
    UserModule,
    ChefModule,
    ClientModule,
    AuthModule
  ],
})
export class AppModule {}
