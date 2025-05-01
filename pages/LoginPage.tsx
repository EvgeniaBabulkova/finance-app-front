import { RootStackParamList } from "@/App";
import { Button } from "@/components/ui/button";
import { ButtonText, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectToken } from "@/store/userSlice";
import { AppDispatch, RootState } from "@/store/store";

// typing the `useNavigation` hook
type LoginPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginPage() {
  const navigation = useNavigation<LoginPageNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  // to authenticate the user based on wather there's a token or not
  const token = useSelector(selectToken);
  const error = useSelector((state: RootState) => state.user.errormessage);

  // Redirect if already authenticated
  useEffect(() => {
    if (token) {
      navigation.navigate("Tabs", { screen: "Home" });
    }
  }, [token, navigation]);

  const handleLogin = async () => {
    console.log("Button clicked!"); // Add this first to check if function is called

    try {
      console.log("Attempting login with:", { email, password });
      const result = await dispatch(login({ email, password })).unwrap();
      console.log("Login result:", result);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  //
  //
  //
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 64,
        gap: 25,
      }}
    >
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Text className="mb-4 text-xl">Welcome Back!</Text>

      <Input className="mb-4 w-3/4">
        <InputField placeholder="Email" value={email} onChangeText={setEmail} />
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
        onPress={() => {
          console.log("Button pressed");
          handleLogin();
        }}
        size="md"
        variant="solid"
        action="primary"
      >
        <ButtonText>Login</ButtonText>
      </Button>

      <Button
        size="md"
        variant="outline"
        onPress={() => navigation.navigate("Register")}
      >
        <ButtonText>Don't have an account? Register</ButtonText>
      </Button>
    </View>
  );
}
