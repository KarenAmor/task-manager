import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hashear la contraseña antes de crear el usuario
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    // Crear una nueva instancia del usuario con la contraseña hasheada
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Almacenar la contraseña hasheada
    });
  
    return this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  
  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username} });
  }
}