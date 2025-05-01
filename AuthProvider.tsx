import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectToken } from "@/store/userSlice";
import { View } from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";

type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = useNavigation<AuthNavigationProp>();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      navigation.navigate("Login");
    }
  }, [token, navigation]);

  return <View style={{ flex: 1 }}>{children}</View>;
}
