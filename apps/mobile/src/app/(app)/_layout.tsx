import { NativeTabs } from "expo-router/unstable-native-tabs";

const AppLayout = () => (
  <NativeTabs>
    <NativeTabs.Trigger name="home">
      <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
    </NativeTabs.Trigger>
    <NativeTabs.Trigger name="settings">
      <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
    </NativeTabs.Trigger>
  </NativeTabs>
);

export default AppLayout;
