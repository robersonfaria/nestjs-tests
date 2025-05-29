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
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { UserGuard } from './user.guard';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name, {
    timestamp: true,
  });

  constructor(private userService: UserService) {}

  @Post('/')
  @UseGuards(UserGuard)
  async create(@Body(new ValidationPipe()) body: createUserDto) {
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
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }
}
