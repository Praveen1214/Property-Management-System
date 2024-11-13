"use client";

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addProperty, updateProperty } from '@/store/features/propertySlice';
import { Property } from '@/types/property.types';

interface PropertyFormProps {
  property?: Property | null;
  onClose: () => void;
}

const PropertyForm = ({ property, onClose }: PropertyFormProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState({
    title: property?.title || '',
    image: property?.image || '',
    location: property?.location || '',
    description: property?.description || '',
    price: property?.price || '',
    propertyType: property?.propertyType || '',
    status: property?.status || '',
    area: property?.area || '',
    landSize: property?.landSize || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (property) {
        await dispatch(updateProperty({ id: property._id, data: formData }));
      } else {
        await dispatch(addProperty(formData));
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = "text", required = false, placeholder = "" }) => (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
      />
    </div>
  );

  const SelectField = ({ label, name, options, required = false }) => (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveSection('basic')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'basic'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveSection('details')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'details'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Property Details
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeSection === 'basic' && (
          <div className="space-y-6">
            <InputField
              label="Property Title"
              name="title"
              required
              placeholder="Enter property title"
            />
            
            <InputField
              label="Image URL"
              name="image"
              placeholder="Enter image URL"
            />

            <InputField
              label="Location"
              name="location"
              required
              placeholder="Enter property location"
            />

            <div className="space-y-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter property description"
              />
            </div>
          </div>
        )}

        {activeSection === 'details' && (
          <div className="space-y-6">
            <InputField
              label="Price"
              name="price"
              type="number"
              required
              placeholder="Enter price"
            />

            <SelectField
              label="Property Type"
              name="propertyType"
              required
              options={[
  
                { value: 'Villa', label: 'Villa' },
                { value: 'Single Family', label: 'Single Family' },
              ]}
            />

            {formData.propertyType === 'Land' && (
              <InputField
                label="Land Size (acres)"
                name="landSize"
                type="number"
                placeholder="Enter land size"
              />
            )}

            <SelectField
              label="Status"
              name="status"
              required
              options={[
                { value: 'For Sale', label: 'For Sale' },
                { value: 'For Rent', label: 'For Rent' },
                
              ]}
            />

            <InputField
              label="Area (sq ft)"
              name="area"
              type="number"
              required
              placeholder="Enter area in square feet"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Cancel
          </button>
          {activeSection === 'basic' ? (
            <button
              type="button"
              onClick={() => setActiveSection('details')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            >
              {loading ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;