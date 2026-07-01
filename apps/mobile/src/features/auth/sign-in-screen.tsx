import { Image } from "expo-image";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";

import { SignInForm } from "./sign-in/sign-in-form";

const SignInScreen = () => (
  <SafeAreaView className="flex-1 bg-background">
    <KeyboardAvoidingView
      behavior={process.env.EXPO_OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center px-6 pb-8"
      >
        <View className="gap-y-8">
          <View className="items-center gap-y-4">
            <Image
              accessibilityLabel="DTracker"
              source={require("@/assets/images/icon.png")}
              style={{ height: 72, width: 72 }}
              className="rounded-2xl"
            />
            <View className="items-center gap-y-2">
              <Text className="text-3xl font-semibold text-foreground">
                Welcome back
              </Text>
              <Text className="text-center text-base text-muted-foreground">
                Sign in to your account
              </Text>
            </View>
          </View>

          <SignInForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default SignInScreen;
