import { Link } from "expo-router";
import { Text } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";

const AppScreen = () => (
  <SafeAreaView>
    <Text>AppScreen</Text>
    <Link href="/">
      <Text>Go to Onboarding</Text>
    </Link>
  </SafeAreaView>
);

export default AppScreen;
