import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Fish } from '@/lib/types';

interface FishState {
  fishes: Fish[];
  selectedFish: Fish | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FishState = {
  fishes: [],
  selectedFish: null,
  isLoading: false,
  error: null,
};

export const getAllFishes = createAsyncThunk('fish/getAllFishes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5000/api/fish');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getFishById = createAsyncThunk(
  'fish/getFishById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/fish/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFish = createAsyncThunk(
  'fish/createFish',
  async (fishData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fish/add-fish', fishData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFish = createAsyncThunk(
  'fish/updateFish',
  async ({ id, data }: { id: string; data: Partial<Fish> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/fish/editFish/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFish = createAsyncThunk(
  'fish/deleteFish',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/fish/deleteFish/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fishSlice = createSlice({
  name: 'fish',
  initialState,
  reducers: {
    clearSelectedFish: (state) => {
      state.selectedFish = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Fishes
      .addCase(getAllFishes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllFishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fishes = action.payload;
      })
      .addCase(getAllFishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get Fish By Id
      .addCase(getFishById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFishById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedFish = action.payload;
      })
      .addCase(getFishById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Fish
      .addCase(createFish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fishes.push(action.payload);
      })
      .addCase(createFish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Fish
      .addCase(updateFish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFish.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.fishes.findIndex((fish) => fish.id === action.payload.id);
        if (index !== -1) {
          state.fishes[index] = action.payload;
        }
      })
      .addCase(updateFish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Fish
      .addCase(deleteFish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fishes = state.fishes.filter((fish) => fish.id !== action.payload);
      })
      .addCase(deleteFish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedFish } = fishSlice.actions;
export default fishSlice.reducer;