import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(1, { message: 'Username is required' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short. It should be at least 6 characters long' })
  password: string;
}