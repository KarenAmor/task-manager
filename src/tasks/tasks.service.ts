import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { User } from '../users/user.entity'; // Importa la entidad User
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    @InjectRepository(User) // Inyecta el repositorio de User
    private userRepository: Repository<User>,
  ) {}

  async findAll(userId: number, paginationOptions: { skip: number; take: number }): Promise<Task[]> {
    const { skip, take } = paginationOptions;
    return this.tasksRepository
      .createQueryBuilder('task')
      .innerJoin('task.user', 'user') // INNER JOIN asegura que solo se consideren tareas con usuario asignado
      .where('user.id = :userId', { userId })
      .skip(skip)
      .take(take)
      .getMany();
  }  

  async findOne(userId: number, taskId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } }, // Filtra por ID de tarea y ID de usuario
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('Valor recibido de userId:', userId);
  
    // Buscamos el usuario por el id proporcionado
    const userEntity = await this.userRepository.findOne({ where: { id: userId } });
    if (!userEntity) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    // Como el DTO no tiene la propiedad "user", usamos sus propiedades directamente.
    // Declaramos taskData como Partial<Task> para que TypeScript lo entienda bien.
    const taskData: Partial<Task> = {
      title: createTaskDto.title,
      description: createTaskDto.description,
    };
  
    // Creamos la tarea asignándole el usuario obtenido.
    const task = this.tasksRepository.create({
      ...taskData,
      user: userEntity,
    });
  
    // Guardamos la tarea y forzamos el tipo a Task en caso de dudas
    const savedTask = await this.tasksRepository.save(task);
    return savedTask as Task;
  }
  
  async update(userId: number, taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(userId, taskId); // Verifica que la tarea pertenezca al usuario
    Object.assign(task, updateTaskDto); // Actualiza los campos de la tarea
    return this.tasksRepository.save(task); // Guarda los cambios
  }

  async remove(userId: number, taskId: number): Promise<{ message: string }> {
    const task = await this.findOne(userId, taskId); // Verifica que la tarea pertenezca al usuario
    await this.tasksRepository.remove(task); // Elimina la tarea
    return { message: 'Tarea eliminada exitosamente' };
  }
}