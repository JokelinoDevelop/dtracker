import { Image } from "expo-image";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { ForgotPasswordForm } from "@/features/auth/forgot-password/forgot-password-form";

const ForgotPasswordScreen = () => (
  <SafeAreaView className="flex-1 bg-background">
    <KeyboardAvoidingView
      behavior={process.env.EXPO_OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center px-6 pb-8 pt-12"
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
                Reset password
              </Text>
              <Text className="text-center text-base text-muted-foreground">
                Enter your email and we'll send you a verification code
              </Text>
            </View>
          </View>

          <ForgotPasswordForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default ForgotPasswordScreen;
