import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(['Colombo', 'Kandy', 'Galle'])
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsEnum(['Single Family', 'Villa'])
  propertyType: string;

  @IsEnum(['For Sale', 'For Rent'])
  status: string;

  @IsNumber()
  area: number;
}