import { RootStackParamList } from "@/App";
import { Button } from "@/components/ui/button";
import { ButtonText, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, selectToken } from "@/store/userSlice";
import { AppDispatch } from "@/store/store";

type RegisterPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function RegisterPage() {
  const navigation = useNavigation<RegisterPageNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken); // Add this line
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await dispatch(register({ username, email, password }));
      // If registration successful, navigation will be handled by auth check
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // Add this effect
  useEffect(() => {
    if (token) {
      navigation.navigate("Tabs", { screen: "Home" });
    }
  }, [token, navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text className="mb-4 text-xl">Create Account</Text>

      <Input className="mb-4 w-3/4">
        <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      </Input>

      <Input className="mb-4 w-3/4">
        <InputField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </Input>

      <Input className="mb-4 w-3/4">
        <InputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Input>

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={handleRegister}
        className="mb-4"
      >
        <ButtonText>Register</ButtonText>
      </Button>

      <Button
        size="md"
        variant="outline"
        onPress={() => navigation.navigate("Login")}
      >
        <ButtonText>Already have an account? Login</ButtonText>
      </Button>
    </View>
  );
}
