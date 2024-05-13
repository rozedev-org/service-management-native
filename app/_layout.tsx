import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pagina Inicial",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="requirements/index"
        options={{
          title: "Requerimientos",
        }}
      />
      <Stack.Screen
        name="requirements/detail/[id]"
        options={{
          title: "Requerimiento",
        }}
      />
    </Stack>
  );
}
