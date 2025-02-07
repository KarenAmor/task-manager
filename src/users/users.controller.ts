import { Controller, Post, Put, Delete, Req, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express'; // ✅ Importación correcta de Request

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard) // ✅ Solo proteger este endpoint
  @ApiBearerAuth() // ✅ Swagger mostrará la opción de autenticación
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    console.log('Usuario autenticado:', req.user); // ✅ Depuración
    const userId = req.user?.['sub']; // ✅ Asegurar que req.user existe
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard) // ✅ Solo proteger este endpoint
  @ApiBearerAuth() // ✅ Swagger mostrará la opción de autenticación
  async remove(@Req() req: Request) {
    console.log('Usuario autenticado:', req.user); // ✅ Depuración
    const userId = req.user?.['sub'];
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    return this.usersService.remove(userId);
  }
}