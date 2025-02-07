import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  
    return this.userRepository.save(user);
  }

  // 🔹 Modificar usuario autenticado
  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Si se envía una nueva contraseña, se hashea antes de guardarla
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // 🔹 Eliminar usuario autenticado
  async remove(userId: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.remove(user);
    return { message: 'Usuario eliminado exitosamente' };
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  
  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username} });
  }
}
