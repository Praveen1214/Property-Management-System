import { Property } from '@/types/property.types';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded">
            {property.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{property.title}</h2>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            LKR {property.price.toLocaleString()}
          </span>
          <span className="text-gray-500">{property.area} sq ft</span>
        </div>
        <div className="mt-2 pt-2 border-t">
          <span className="text-gray-600">{property.propertyType}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;