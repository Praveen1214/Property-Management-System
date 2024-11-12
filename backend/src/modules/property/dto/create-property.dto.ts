import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()  // Make slug optional
  slug?: string;  // Add ? to make it optional in TypeScript

  @IsEnum(['Colombo', 'Kandy', 'Galle'])
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(['Single Family', 'Villa'])
  @IsNotEmpty()
  propertyType: string;

  @IsEnum(['For Sale', 'For Rent'])
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  area: number;
}