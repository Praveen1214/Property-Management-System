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
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

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
      setMessage({ type: "success", text: "Property added successfully!" });
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

      window.location.href = "/";

    } catch (error) {
      setLoading(false);
      setMessage({ type: "error", text: "Error adding property. Please try again." });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>

      {message.text && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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
            placeholder="Enter property title"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={(e) => handleSelectChange("location", e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Describe the property"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (in LKR)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            placeholder="Enter price"
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
          />
        </div>

        {/* Property Type */}
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
            <option value="Single Family">Single Family</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Land Size (conditionally shown) */}
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
              placeholder="Enter land size in acres"
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              required
            />
          </div>
        )}

        {/* Status */}
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
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area (sq ft)
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="Enter area in sq ft"
            required
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
