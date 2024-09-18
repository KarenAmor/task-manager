// src/tasks/tasks.controller.ts
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
  } from '@nestjs/common';
  
  import { TasksService } from './tasks.service';
  import { Task } from './task.entity';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  
  @Controller('tasks')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Get()
    findAll(): Promise<Task[]> {
      return this.tasksService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.tasksService.findOne(id);
    }
  
    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksService.create(createTaskDto);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
      return this.tasksService.update(id, updateTaskDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.tasksService.remove(id);
    }
  }  