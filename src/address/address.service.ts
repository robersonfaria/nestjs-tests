import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    return this.prismaService.address.create({
      data: {
        description: createAddressDto.description,
        address: createAddressDto.address,
        postcode: createAddressDto.postcode,
      },
    });
  }

  findAll() {
    return this.prismaService.address.findMany();
  }

  findOne(id: string) {
    return this.prismaService.address.findFirst({ where: { id } });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.prismaService.address.update({
      data: {
        description: updateAddressDto.description,
        address: updateAddressDto.address,
        postcode: updateAddressDto.postcode,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.address.delete({
      where: { id },
    });
  }
}
