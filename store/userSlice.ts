import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

// type the data
interface UserState {
  token: string | null;
  errormessage: string | null;
  user: {
    username: string;
    email: string;
  } | null;
}

// now initial state for the user
const initialState: UserState = {
  token: null,
  errormessage: null,
  user: null,
};

// to type the incoming data
class CreateUserDto {
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {} // research about public and private
}
class LoginDto {
  constructor(public email: string, public password: string) {}
}

// make the api call here - a register thunk that gets the token
export const register = createAsyncThunk(
  "auth/register",
  async (userData: CreateUserDto) => {
    const response = await fetch("http://10.0.2.2:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Sign-up failed. Try againnn");
    }

    const data = await response.json();
    return data; // This includes the token now
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginDto) => {
    try {
      console.log("Making login request with:", userData);
      const response = await fetch("http://10.0.2.2:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      console.log("Login response status:", response.status);

      const data = await response.text();
      console.log("Raw response:", data);

      if (!response.ok) {
        throw new Error(data || "Login failed");
      }

      return JSON.parse(data);
    } catch (error: any) {
      console.error("Login error details:", error);
      throw error;
    }
  }
);

// Selector to access token anywhere in the app
export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;

// Creaating the slice hereeeeeeee:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Logging out...");
      state.token = null;
      state.user = null;
      state.errormessage = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        // Store the token when register is successful
        state.token = action.payload.user.access_token;
        state.user = {
          username: action.payload.user.username,
          email: action.payload.user.email,
        };
        state.errormessage = null;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("payload", action.payload);
        state.token = null;
        state.errormessage = action.error.message ?? "Registration failed";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action.payload);
        state.token = action.payload.user.access_token;
        state.user = {
          username: action.payload.user.username,
          email: action.payload.user.email,
        };
        state.errormessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login rejected:", action.error);
        state.token = null;
        state.errormessage = action.error.message ?? "Login failed";
      });
  },
});

// exporting it cause we need it in the store
export default userSlice.reducer;
export const { logout } = userSlice.actions;
