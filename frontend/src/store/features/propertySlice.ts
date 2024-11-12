// src/store/features/propertySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Property } from '@/types/property.types';

interface PropertyState {
  items: Property[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PropertyState = {
  items: [],
  status: 'idle',
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/properties';

export const fetchProperties = createAsyncThunk('properties/fetchAll', async () => {
  const response = await axios.get<Property[]>(API_URL);
  return response.data;
});

export const addProperty = createAsyncThunk(
  'properties/add',
  async (propertyData: Omit<Property, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post<Property>(API_URL, propertyData);
    return response.data;
  }
);

export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({ id, data }: { id: string; data: Partial<Property> }) => {
    const response = await axios.put<Property>(`${API_URL}/${id}`, data);
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const searchProperties = createAsyncThunk(
  'properties/search',
  async (filters: { location?: string; status?: string; type?: string }) => {
    const { location, status, type } = filters;
    
    // Build the query string
    const query = new URLSearchParams();
    if (location) query.append('location', location);
    if (status) query.append('status', status);
    if (type) query.append('type', type);

    // Log the generated URL for debugging
    const url = `${API_URL}/search?${query.toString()}`;
    console.log("Request URL:", url);

    const response = await axios.get<Property[]>(url);
    return response.data;
  }
);




const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default propertySlice.reducer;