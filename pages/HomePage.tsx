import { Button, ButtonText } from "@/components/ui/button";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import type { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// typing the `useNavigation` hook
type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomePage() {
  const navigation = useNavigation<HomePageNavigationProp>();
  console.log("HomePage Loaded");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>WELCoME to homeeee page</Text>
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
