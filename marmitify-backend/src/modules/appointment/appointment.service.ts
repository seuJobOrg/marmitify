import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { User } from '../user/user.entity';
import { Chef } from '../chef/chef.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Chef)
    private readonly chefRepository: Repository<Chef>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const user = await this.userRepository.findOne({
      where: { id: createAppointmentDto.userId },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const chef = await this.chefRepository.findOne({
      where: { id: createAppointmentDto.chefId },
    });
    if (!chef) {
      throw new NotFoundException('Chefe não encontrado');
    }

    const appointment = this.appointmentRepository.create({
      dateTime: createAppointmentDto.dateTime,
      notes: createAppointmentDto.notes,
      user,
      chef,
    });

    return await this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      relations: ['user', 'chef'],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'chef'],
    });
    if (!appointment) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }
    return appointment;
  }

  async findByChefId(chefId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { chef: { id: chefId } },
      relations: ['user', 'chef', 'chef.user'],
    });
  }

  async findByUserId(userId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { user: { id: userId } },
      relations: ['chef', 'chef.user'],
    });
  }
}
