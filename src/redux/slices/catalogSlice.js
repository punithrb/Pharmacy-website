import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockMedicines } from '../../mockData';

// Mock API Call (Simulating Axios/Fetch)
const fetchMedicinesAPI = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockMedicines });
    }, 500); // Simulate network delay
  });
};

// Async Thunk to fetch medicines
export const fetchMedicines = createAsyncThunk(
  'catalog/fetchMedicines',
  async () => {
    const response = await fetchMedicinesAPI();
    return response.data;
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    medicines: [],
    loading: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    searchTerm: '',
    filters: {
      category: null,
      brand: null,
      priceRange: [0, 100],
    },
    recommendations: mockMedicines.slice(0, 5), // Mock recommendations
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setFilters } = catalogSlice.actions;
export default catalogSlice.reducer;