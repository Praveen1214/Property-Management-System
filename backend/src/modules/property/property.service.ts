import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const createdProperty = new this.propertyModel(createPropertyDto);
    return createdProperty.save();
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    return this.propertyModel.findById(id).exec();
  }

  async update(id: string, updatePropertyDto: Partial<CreatePropertyDto>): Promise<Property> {
    return this.propertyModel
      .findByIdAndUpdate(id, updatePropertyDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Property> {
    return this.propertyModel.findByIdAndDelete(id).exec();
  }
  
  async findByLocation(location: string): Promise<Property[]> {
    return this.propertyModel.find({ location }).exec();
  }
}