import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

// type the data
interface UserState {
  token: string;
  errormessage: string | null;
}

// now initial state for the user
const initialState: UserState = {
  token: "",
  errormessage: null,
};

// to type the incoming data
class CreateUserDto {
  constructor(public email: string, public password: string) {} // research about public and private
}
// make the api call here - a register thunk that gets the token
export const register = createAsyncThunk(
  "auth/register",
  async (CreateUserDto: CreateUserDto) => {
    const response = await fetch("http://10.0.2.2:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CreateUserDto),
    });

    if (!response.ok) {
      throw new Error("Sign-up failed. Try againnn");
    }

    const data = await response.json();
    return data; // This includes the token now
  }
);
// Selector to access token anywhere in the app
export const selectToken = (state: RootState) => state.user.token;

// Creaating the slice hereeeeeeee:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        // Store the token when register is successful
        state.token = action.payload.token;
        state.errormessage = null;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("payload", action.payload);
      });
  },
});

// exporting it cause we need it in the store
export default userSlice.reducer;
