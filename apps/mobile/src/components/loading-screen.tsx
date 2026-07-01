import { ActivityIndicator, View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";

export function LoadingScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <View className="items-center justify-center">
        <ActivityIndicator className="text-primary" size="large" />
      </View>
    </SafeAreaView>
  );
}
