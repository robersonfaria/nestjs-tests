import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  postcode: string;
}
