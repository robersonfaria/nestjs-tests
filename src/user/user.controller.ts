import {
  Controller,
  Post,
  Delete,
  PreconditionFailedException,
  Body,
  Logger,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Body() body: createUserDto) {
    const { name, email, password } = body;

    if (!name || !email || !password) {
      this.logger.error('The name, email and password fields are required');
      throw new PreconditionFailedException(
        'Fields name, email and password are required.',
      );
    }
    const data: Prisma.UserCreateInput = {
      name,
      email,
      password,
    };

    const user = await this.userService.create(data);
    this.logger.log('User created successfully');
    return user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() param: { id: number }) {
    await this.userService.delete(Number(param.id));
  }
}
