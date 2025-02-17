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
// import { useNavigation } from "@react-navigation/native";
// -------------------------------------------------------------------------------------------------------
// fix the typescript error

export default function CategoriesPage() {
  // const navigation = useNavigation();
  console.log("CategoriesPage Loaded");

  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState<
    { id: number; title: string }[]
  >([]); // for the list of categores
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategoriesList(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [categoriesList]);

  const handleSubmit = async () => {
    if (!category.trim()) {
      Alert.alert("Error", "Category name cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: category }),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      const data = await response.json();
      Alert.alert("Success", `Category "${data.title}" created!`);
      setCategory(""); // Clear input after success
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <GluestackUIProvider mode="light">
      {/* btn for some page
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={() => navigation.navigate("Some")}
        className="mt-4"
      >
        <ButtonText>Go to some page</ButtonText>
      </Button> */}

      <View style={styles.container}>
        <Heading highlight>Expenses</Heading>

        <FormControl size="lg">
          {" "}
          <FormControlLabel>
            <FormControlLabelText> New category </FormControlLabelText>
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

        {/* Categories List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Categories</Text>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={categoriesList}
              keyExtractor={(item) => item.id.toString()}
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
