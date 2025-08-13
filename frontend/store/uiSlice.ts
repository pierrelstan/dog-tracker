"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusFilter = "all" | "moving" | "idle" | "low_battery" | "offline";

type UIState = {
  status: StatusFilter;
  // Lookback window in minutes for KPIs/charts (applies to local histories)
  lookbackMinutes: number;
};

const initialState: UIState = {
  status: "all",
  lookbackMinutes: 15
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<StatusFilter>) {
      state.status = action.payload;
    },
    setLookbackMinutes(state, action: PayloadAction<number>) {
      state.lookbackMinutes = action.payload;
    }
  }
});

export const { setStatus, setLookbackMinutes } = uiSlice.actions;
export default uiSlice.reducer;
