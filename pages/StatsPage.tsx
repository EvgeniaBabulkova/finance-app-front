import { Button, ButtonText } from "@/components/ui/button";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import type { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// typing the `useNavigation` hook
type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Stats"
>;

export default function StatsPage() {
  const navigation = useNavigation<HomePageNavigationProp>();
  console.log("HomePage Loaded");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>WELCOMEeee</Text>
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={() => navigation.navigate("Categories")} // it would lead to stats inside the stack navigator, so no tabs
        className="mt-4"
      >
        <ButtonText>Go back to categoriess</ButtonText>
      </Button>
    </View>
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { decrement, increment } from "../store/counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Button onPress={() => dispatch(increment())} />

      <Text>{count.toString()}</Text>
      <Button onPress={() => dispatch(decrement())} />
    </View>
  );
}
