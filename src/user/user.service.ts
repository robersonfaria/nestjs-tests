import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (user) {
      this.logger.error('There is already a user with this email.');
      throw new ConflictException('There is already a user with this email.');
    }

    data.password = await bcrypt.hash(data.password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await this.prisma.user.create({
      data,
    });
    return newUser;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException('User not found');
    }

    try {
      await this.prisma.user.delete({ where: { id: id } });
      return true;
    } catch (err) {
      this.logger.error('Error to delete user.', err);
      throw err;
    }
    return false;
  }
}
