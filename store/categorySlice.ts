import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async function to fetch categories from the backend
export const fetchCategories = createAsyncThunk(
  "category/fetchAll", // thats just the name of the redux thunk
  async () => {
    const response = await fetch("http://10.0.2.2:3000/categories");
    return await response.json();
  }
);

// Async function to create a new category
export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryName: string) => {
    const response = await fetch("http://10.0.2.2:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: categoryName }),
    });
    return await response.json();
  }
);

interface CategoryEntity {
  id: number;
  title: string;
}
interface CategoryState {
  categories: CategoryEntity[];
  status: "idle" | "loading" | "succeeded" | "failed"; // API call status
  errormessage: string | null; // Allow null OR string
}

// Initial state for categories
const initialState: CategoryState = {
  categories: [], // Stores the fetched categories
  status: "idle", // Tracks the request status: idle/loading/succeeded/failed
  errormessage: null, // Stores any error message
};

// creaating the slice here:
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {}, // No synchronous reducers needed yet e.g. toggling sth
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      // all state logic for fetching categoies
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add user to the state array
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        // we need the fallback action cause by default typescript knows the error.message may be
        // defined, but it can also not exist - be undefined, therefore this causes a typescript error
        // since our type is only string or null (this way we are always getting a string and never null)
        state.errormessage = action.error.message ?? "Error creating category";
      });

    // all state logic for creating categoies
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading"; // Set status to loading when request starts
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded"; // First mark category creation as success - this triggers useSelector to update the state, cause it sees there was a change - the status(cause thats what we are checking for - we dont have a way to check if the database list chagned and that's the equivalent of this)
        state.categories.push(action.payload); // action.payload is the new category
        state.errormessage = null; // to clear any previous errors
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if request fails
        state.errormessage = action.error.message ?? "Error creating category"; // Store error message
      });
  },
});

// exporting it cause we need it in the store
export default categorySlice.reducer;
