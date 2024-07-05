import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialUserState = {};

const eventSlice = createSlice({
  name: "events",
  initialState: initialUserState,
  reducers: {},
});

export default eventSlice.reducer;
export const {} = eventSlice.actions;
