import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
async login(@Body() body: LoginDto) {
  const user = await this.authService.validateUser(body);
  console.log('Usuario validado:', user); // Log para verificar que el usuario se ha validado
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }
  const token = await this.authService.login(user);
  console.log('Token generado:', token); // Log para verificar que el token se ha generado
  return token;
}

}