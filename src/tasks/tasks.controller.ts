import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks') // Agrupa en Swagger
@ApiBearerAuth()
@Controller('tasks')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@UseGuards(JwtAuthGuard) // Aplica el guard a nivel de controlador
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @Req() req: Request, // Obtén el objeto de la solicitud
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Task[]> {
    const userId = req.user['sub']; // Obtén el ID del usuario desde el token
    return this.tasksService.findAll(userId, { skip: (page - 1) * limit, take: limit });
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    const userId = req.user['sub']; // Obtén el ID del usuario desde el token
    return this.tasksService.findOne(userId, id);
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const userId = req.user['sub']; // Obtén el ID del usuario desde el token
    return this.tasksService.create(userId, createTaskDto);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const userId = req.user['sub']; // Obtén el ID del usuario desde el token
    return this.tasksService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const userId = req.user['sub']; // Obtén el ID del usuario desde el token
    return this.tasksService.remove(userId, id);
  }
}