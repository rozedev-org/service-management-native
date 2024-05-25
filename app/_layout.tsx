import { MenuSidebar } from "@/components/Menu";
import { Stack } from "expo-router";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
export default function RootLayout() {
  const titleScreen = "Service Management";
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: titleScreen,
            headerRight: () => <MenuSidebar />,
          }}
        />
        <Stack.Screen
          name="requirements/index"
          options={{
            title: titleScreen,
            headerRight: () => <MenuSidebar />,
          }}
        />
        <Stack.Screen
          name="requirements/detail/[id]"
          options={{
            title: titleScreen,
            headerRight: () => <MenuSidebar />,
          }}
        />
        <Stack.Screen
          name="users/index"
          options={{
            title: titleScreen,
            headerRight: () => <MenuSidebar />,
          }}
        />
        <Stack.Screen
          name="auth/login/index"
          options={{
            title: titleScreen,
            headerRight: () => <MenuSidebar />,
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
