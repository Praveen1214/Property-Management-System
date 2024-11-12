import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    // Generate slug from title if not provided
    if (!createPropertyDto.slug) {
      createPropertyDto.slug = this.generateSlug(createPropertyDto.title);
    }
    
    const createdProperty = new this.propertyModel(createPropertyDto);
    return createdProperty.save();
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException('Invalid ID format');
    }
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async update(id: string, updatePropertyDto: Partial<CreatePropertyDto>): Promise<Property> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException('Invalid ID format');
    }
    const updatedProperty = await this.propertyModel
      .findByIdAndUpdate(id, updatePropertyDto, { new: true })
      .exec();
    if (!updatedProperty) {
      throw new NotFoundException('Property not found');
    }
    return updatedProperty;
  }

  async remove(id: string): Promise<Property> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException('Invalid ID format');
    }
    const deletedProperty = await this.propertyModel.findByIdAndDelete(id).exec();
    if (!deletedProperty) {
      throw new NotFoundException('Property not found');
    }
    return deletedProperty;
  }

  async findByLocation(location: string): Promise<Property[]> {
    return this.propertyModel
      .find({ location: { $regex: location, $options: 'i' } }) // case-insensitive search
      .exec();
  }

  async findByFilters(filters: { location?: string; status?: string; type?: string }) {
    const query: any = {};
  
    if (filters.location) {
      query.location = filters.location;
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.type) {
      query.type = filters.type;
    }
  
    try {
      return await this.propertyModel.find(query).exec();
    } catch (error) {
      console.error('Error fetching properties with filters:', error);
      throw new InternalServerErrorException('Error fetching properties');
    }
  }
  
}
