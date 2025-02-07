import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; // ✅ Importar correctamente Request

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest(); // ✅ Definir el tipo de request
    console.log('Encabezado Authorization en JwtAuthGuard:', request.headers.authorization);

    const result = await super.canActivate(context) as boolean;
    
    if (!result) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    
    return result;
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw new UnauthorizedException('Token inválido o usuario no encontrado');
    }
    return user;
  }
}