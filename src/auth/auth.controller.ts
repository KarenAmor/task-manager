import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express'; // Importa Response de express
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(body);
    console.log('Usuario validado:', user); // Log para verificar que el usuario se ha validado
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.login(user);
    console.log('Token generado:', token); // Log para verificar que el token se ha generado

    // Agrega el token a la cabecera de la respuesta
    res.setHeader('Authorization', `Bearer ${token.access_token}`);

    // Devuelve el token en el cuerpo de la respuesta (opcional)
    return res.json(token);
  }
}