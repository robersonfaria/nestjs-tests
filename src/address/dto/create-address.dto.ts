import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  postcode: string;
}
