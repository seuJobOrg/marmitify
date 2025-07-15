import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity('chefs')
export class Chef {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany(() => Appointment, (appointment) => appointment.chef, {
    eager: false,
  })
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
