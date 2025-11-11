import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockUser } from '../../mockData';

// Mock API Call for User data
const fetchUserAPI = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockUser });
    }, 300);
  });
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const response = await fetchUserAPI();
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    // Reducers for updating profile details, prescriptions, etc.
    updateMedicalHistory: (state, action) => {
      if (state.profile) {
        state.profile.medicalHistory = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateMedicalHistory } = userSlice.actions;
export default userSlice.reducer;