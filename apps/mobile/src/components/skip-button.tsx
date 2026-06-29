import { router } from "expo-router";
import { Text, Pressable } from "react-native";

const SkipButton = () => (
  <Pressable
    onPress={() => router.replace("/(auth)/sign-in")}
    hitSlop={10}
    className="px-2 py-1"
  >
    <Text className="text-primary text-base font-medium">Skip</Text>
  </Pressable>
);

export default SkipButton;
