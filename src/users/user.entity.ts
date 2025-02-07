// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity'; 
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // Relación One-to-Many con Task
  @OneToMany(() => Task, (task) => task.user) // Define la relación inversa
  tasks: Task[]; // Esta propiedad representa la relación con Task
}