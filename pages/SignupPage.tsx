import { RootStackParamList } from "@/App";
import { Button } from "@/components/ui/button";
import { ButtonText, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// typing the `useNavigation` hook
type SignupPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

export default function SignupPage() {
  const navigation = useNavigation<SignupPageNavigationProp>();
  console.log("SignupPage Loaded");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>WELCoME</Text>

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
        className="mt-4"
      >
        <ButtonText>signup btn only for now</ButtonText>
      </Button>
    </View>
  );
}
