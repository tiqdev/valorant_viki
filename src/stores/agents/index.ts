import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAgents as fetchAgentsFromApi } from "../../api/valorantApi";
import { Agent } from "../../models/Agent";

interface AgentsState {
  agents: Agent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AgentsState = {
  agents: [],
  status: "idle",
  error: null,
};

export const _fetchAgents = createAsyncThunk(
  "agents/fetchAgents",
  async (_, { rejectWithValue }) => {
    try {
      const agents = await fetchAgentsFromApi();
      return agents;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchAgents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(_fetchAgents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.agents = action.payload;
      })
      .addCase(_fetchAgents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default agentsSlice.reducer;
