import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, enum: ['Colombo', 'Kandy', 'Galle'] })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: ['Single Family', 'Villa'] })
  propertyType: string;

  @Prop({ required: true, enum: ['For Sale', 'For Rent'] })
  status: string;

  @Prop({ required: true })
  area: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);