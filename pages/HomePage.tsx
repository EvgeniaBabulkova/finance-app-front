import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import type { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// ✅ Type the `useNavigation` hook
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomePage() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  console.log("HomePage Loaded");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This should be the eentry page of the app</Text>

      {/* btn for some page */}
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={() => navigation.navigate("Categories")}
        className="mt-4"
      >
        <ButtonText>Go to categoriess</ButtonText>
      </Button>
    </View>
  );
}
