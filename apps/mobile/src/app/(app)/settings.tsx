import type { ReactNode } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { useSession } from "@/features/auth/hooks/use-session";
import { useSignOut } from "@/features/auth/sign-out/sign-out.mutation";
import { useOnboarding } from "@/features/onboarding/onboarding-provider";
import { cn } from "@/lib/utils";

const SettingsScreen = () => {
  const { data: session } = useSession();
  const { resetOnboarding } = useOnboarding();

  const { mutateAsync: signOut, isPending: isSigningOut } = useSignOut();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="gap-y-6 px-4 py-4"
        contentInsetAdjustmentBehavior="automatic"
      >
        <SettingsSection title="Profile">
          <SettingsFieldRow label="Name" value={session?.user?.name ?? "—"} />
          <SettingsFieldRow label="Email" value={session?.user?.email ?? "—"} />
          <SettingsFieldRow
            isLast
            label="Member since"
            value={formatMemberSince(session?.user?.createdAt)}
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <View className="gap-y-3 p-4">
            <SettingsActionButton
              label="Restart Onboarding"
              onPress={handleRestartOnboarding}
            />
            <SettingsActionButton
              disabled={isSigningOut}
              label={isSigningOut ? "Signing out..." : "Sign out"}
              onPress={handleSignOut}
            />
          </View>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );

  function handleRestartOnboarding() {
    Alert.alert(
      "Restart Onboarding",
      "Are you sure you want to restart the onboarding?",
      [
        {
          style: "cancel",
          text: "Cancel",
        },
        {
          onPress: () => resetOnboarding(),
          style: "destructive",
          text: "Restart",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  function handleSignOut() {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          style: "cancel",
          text: "Cancel",
        },
        {
          onPress: () => signOut(),
          style: "destructive",
          text: "Sign Out",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
};

export default SettingsScreen;

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="gap-y-2">
      <Text className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </Text>
      <View className="overflow-hidden rounded-xl border border-border bg-muted">
        {children}
      </View>
    </View>
  );
}

type SettingsFieldRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function SettingsFieldRow({ label, value, isLast }: SettingsFieldRowProps) {
  return (
    <View
      className={cn(
        "flex-row items-center gap-x-2 px-4 py-3",
        !isLast && "border-b border-border"
      )}
    >
      <Text className="text-base text-foreground">{label}</Text>
      <View className="flex-1" />
      <Text
        className="max-w-[60%] text-right text-base text-muted-foreground"
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}

type SettingsActionButtonProps = {
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

function SettingsActionButton({
  label,
  disabled,
  onPress,
}: SettingsActionButtonProps) {
  return (
    <Pressable
      className={cn(
        "w-full items-center justify-center rounded-xl border border-border px-4 py-3 active:opacity-80",
        disabled && "opacity-50"
      )}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-base font-semibold text-foreground">{label}</Text>
    </Pressable>
  );
}

function formatMemberSince(value: string | Date | undefined) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
