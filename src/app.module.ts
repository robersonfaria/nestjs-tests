import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AddressModule } from './address/address.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AddressModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
