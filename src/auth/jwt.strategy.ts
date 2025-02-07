import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Usa el secreto directamente
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Payload JWT recibido:', payload);
    const user = await this.usersService.findOneByUsername(payload.username);
    console.log('Usuario encontrado:', user);

    if (!user) {
      console.error('Usuario no encontrado para el payload:', payload); // Log de error
      throw new UnauthorizedException('Usuario no autorizado');
    }
    
    
    return {...user, sub: payload.sub};
  }
}