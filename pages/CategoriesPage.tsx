import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/heading";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory } from "@/store/categorySlice";
import { AppDispatch, RootState } from "@/store/store"; // Import RootState from store.ts
import { selectToken } from "@/store/userSlice";

// -------------------------------------------------------------------------------------------------------

type CategoriesPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Categories"
>;

export default function CategoriesPage() {
  const navigation = useNavigation<CategoriesPageNavigationProp>();
  console.log("CategoriesPage Loaded");

  const token = useSelector(selectToken);
  const [category, setCategory] = useState(""); // Local state for input field
  const dispatch = useDispatch<AppDispatch>(); // we are typing it this way cause of the thunk
  const { categories, status, errormessage } = useSelector(
    (state: RootState) => state.category // points to the store
  ); // useSelector
  // connects this component to the Redux store, extracts the category slice of state from Redux.
  // And returns an object { categories, status, errormessage }, so your component can display the data.
  // Aka subscribes to the state of the categories

  // Fetch categories when the page loads aka when there is state (and its "idle")
  useEffect(() => {
    if (status === "idle" && token) {
      // by using dispatch, we are not only making the api call, but making the cll thrugh Redux, so the staate updates in the store
      dispatch(fetchCategories(token));
    }
  }, [dispatch, status, token]); // adding dispatch here is related more to a eslint rule, than to sth i should care about

  // Handle category creation using Redux
  const handleSubmit = () => {
    if (!category.trim()) {
      Alert.alert("Error", "Category name cannot be empty.");
      return;
    }
    dispatch(createCategory({ categoryName: category, token }));
    setCategory(""); // Clear input after success
  };

  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={() => navigation.navigate("Stats")}
          className="mt-4"
        >
          <ButtonText>Go to stats</ButtonText>
        </Button>

        <Heading highlight>Expenses</Heading>

        <FormControl size="lg">
          {" "}
          <FormControlLabel>
            <FormControlLabelText> New categoryyyy </FormControlLabelText>
          </FormControlLabel>
          <Input variant="outline" size="md">
            <InputField
              type="text"
              placeholder="E.g. Rent"
              value={category}
              onChangeText={(text) => setCategory(text)}
            />
          </Input>
        </FormControl>

        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={handleSubmit}
          className="mt-4"
        >
          <ButtonText>Create</ButtonText>
        </Button>

        {/* deal with error occurance */}
        {status === "failed" && (
          <Text style={{ color: "red" }}>{errormessage}</Text> // ✅ Show error from Redux
        )}

        {/* Categories List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Categories</Text>

          {/* Show Loading State */}
          {status === "loading" && <Text>Loading...</Text>}

          {/* Show Error Message */}
          {errormessage && <Text style={{ color: "red" }}>{errormessage}</Text>}

          {/* Display Fetched Categories */}
          {status === "succeeded" && (
            <FlatList
              data={categories}
              keyExtractor={(item) =>
                item.id.toString() ?? Math.random().toString()
              }
              renderItem={({ item }) => (
                <Text style={styles.listItem}>• {item.title}</Text>
              )}
            />
          )}
        </View>

        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: 60,
    width: "80%",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    marginVertical: 5,
  },
});
