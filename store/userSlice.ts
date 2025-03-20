import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// to type the incoming data
class CreateUserDto {
  constructor(public email: string, public password: string) {} // research about public and private
}

// make the api call here
export const signup = createAsyncThunk(
  "auth/signup",
  async (CreateUserDto: CreateUserDto, thunkAPI) => {
    // what would this thunkAPI do?
    const response = await fetch("http://10.0.2.2:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CreateUserDto }),
    });

    if (!response.ok) {
      throw new Error("Sign-up failed. Try again.");
    }

    return await response.json();
  }
);

// whats the initial state here
interface UserState {
  token: string;
  errormessage: string | null;
}

// Initial state for categories
const initialState: UserState = {
  token: "",
  errormessage: null,
};

// creaating the slice here:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(signup.fulfilled, (state, action) => {
        console.log("payload", action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        console.log("payload", action.payload);
      });
  },
});

// exporting it cause we need it in the store
export default userSlice.reducer;
