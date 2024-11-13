import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // This will add createdAt and updatedAt fields
})
export class Property {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ 
    required: true,
    unique: true,  // This ensures uniqueness
    // Add this if you want to auto-generate the slug from title
    set: (value: string) => {
      if (!value) {
        return value;
      }
      return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
  })
  slug: string;

  @Prop({ required: true, enum: ['Colombo', 'Kandy', 'Galle'] })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: ['Single Family', 'Villa'] })
  propertyType: string;

  @Prop({ required: true, enum: ['For Sale', 'For Rent',] })
  status: string;

  @Prop({ required: true })
  area: number;
}

export type PropertyDocument = Property & Document;

export const PropertySchema = SchemaFactory.createForClass(Property);

PropertySchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});