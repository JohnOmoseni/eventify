import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: {
    id: "",
    username: "John Omoseni",
    email: "",
    email_verified: false,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, { payload }) => {
      const { email, userId, username } = payload;
      state.user = { ...state.user, email, id: userId, username };
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
