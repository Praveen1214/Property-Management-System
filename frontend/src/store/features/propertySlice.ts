import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  squareFt: number;
  type: string;
  status: string;
  image: string;
}

interface PropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    type: string;
    location: string;
    minPrice: number | null;
    maxPrice: number | null;
  };
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    type: '',
    location: '',
    minPrice: null,
    maxPrice: null,
  },
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState() as { property: PropertyState };
      const response = await axios.get('http://localhost:3000/properties', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch properties');
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters } = propertySlice.actions;
export default propertySlice.reducer;