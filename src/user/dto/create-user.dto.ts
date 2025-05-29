import { IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
