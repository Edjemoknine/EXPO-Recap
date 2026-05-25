import { usePathname } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const Layout = () => {
  const pathname = usePathname();

  return (
    <NativeTabs hidden={pathname === "/generate"}>
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="home" sf={"headlight.fog"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(profile)">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="e911_avatar" sf={"person"} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default Layout;
