import { AddIcon, GluestackUIProvider, Icon, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { Link } from "expo-router";
import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  ButtonGroup,
} from "@gluestack-ui/themed";
export default function Index() {
  return (
    <GluestackUIProvider config={config}>
      <Text>Hello World!</Text>
      <Button
        size="xs"
        variant="solid"
        bg="$darkBlue600"
        marginRight={"auto"}
        height={"$9"}
        width={"$20"}
        mt={"$2"}
      >
        <Link href={"/home"}>Home</Link>
      </Button>
      <Button action="positive" height={"$9"} width={"$20"} mt={"$2"}>
        <Link href={"/requirements"}>Page</Link>
      </Button>
    </GluestackUIProvider>
  );
}
