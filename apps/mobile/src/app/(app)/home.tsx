import { Link } from "expo-router";
import { Text } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/features/auth/sign-out/sign-out.mutation";

const AppScreen = () => {
  const { mutateAsync: signOut } = useSignOut();

  return (
    <SafeAreaView>
      <Text>AppScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          try {
            await signOut();
          } catch (error) {
            console.error(error);
          }
        }}
      />
      <Link href="/onboarding">
        <Text>Go to Onboarding</Text>
      </Link>
    </SafeAreaView>
  );
};

export default AppScreen;
