import { Text, View } from "react-native";

type FormErrorBannerProps = {
  message: string;
};

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
    >
      <Text selectable className="text-sm text-red-600">
        {message}
      </Text>
    </View>
  );
}
