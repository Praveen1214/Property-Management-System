"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProperty } from "@/store/features/propertySlice";

const AddProperty = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    location: "",
    description: "",
    price: "",
    propertyType: "",
    status: "",
    area: "",
    landSize: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLocationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      location: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure price and area are sent as numbers
    const propertyData = {
      ...formData,
      price: Number(formData.price),
      area: Number(formData.area),
      landSize:
        formData.propertyType === "Land"
          ? Number(formData.landSize)
          : undefined,
    };

    try {
      await dispatch(addProperty(propertyData)).unwrap();
      setLoading(false);
      alert("Property added successfully!");
      setFormData({
        title: "",
        image: "",
        location: "",
        description: "",
        price: "",
        propertyType: "",
        status: "",
        area: "",
        landSize: "",
      });
    } catch (error) {
      setLoading(false);
      alert("There was an error adding the property. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>

          <select
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={(e) => handleSelectChange("propertyType", e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Type</option>
            <option value="House">Single Family</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {formData.propertyType === "Land" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Size (acres)
            </label>
            <input
              type="number"
              name="landSize"
              value={formData.landSize}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => handleSelectChange("status", e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Status</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area (sq ft)
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
