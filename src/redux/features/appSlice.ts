import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type StateProp = {
  openMenu: boolean;
  screenSize: number;
};

const initialAppState: StateProp = {
  openMenu: false,
  screenSize: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.openMenu = action.payload;
    },
    setScreenSize: (state, action: PayloadAction<number>) => {
      state.screenSize = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setScreenSize, setOpenMenu } = appSlice.actions;
