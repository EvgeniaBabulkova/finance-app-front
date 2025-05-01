import { View, Text } from "@gluestack-ui/themed";
import { Button, ButtonText } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken, selectUser } from "@/store/userSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import { useEffect } from "react";

type ProfilePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export default function ProfilePage() {
  const navigation = useNavigation<ProfilePageNavigationProp>();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!token) {
      navigation.navigate("Login");
    }
  }, [token, navigation]);

  if (!user) {
    return null; // or a loading spinner
  }

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text className="mb-4 text-xl">Profile</Text>
      <Text className="mb-4 text-xl">Welcome, {user.username}!</Text>

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={handleLogout}
        className="mt-4"
      >
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
}
