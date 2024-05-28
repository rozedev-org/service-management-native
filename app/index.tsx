import {
  Button,
  ButtonIcon,
  ButtonText,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserSession } from "@/states/useUserSession";

export default function Index() {
  const { isLoggedIn } = useUserSession();
  const [network, setNetwork] = useState<NetInfoState>();
  const [wifiSignal, setWifiSignal] = useState<number | null>(null);
  const [typeSignal, setTypeSignal] = useState<string | null>("Innacesible");
  const [type, setType] = useState<string | null>("Innacesible");
  useEffect(() => {
    const intervalId = setInterval(() => {
      NetInfo.fetch().then((state) => {
        setNetwork(state);
        if (state.type == "cellular") {
          setType("Telefono");
        } else {
          setType(state.type);
        }
        if (state.type === "wifi") {
          setWifiSignal(state.details.strength);
        }
        if (state.type === "cellular") {
          setTypeSignal(state.details.cellularGeneration);
        }
      });
    }, 1000); // 10000 milisegundos = 10 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handelClose = (href: string) => {
    setShowModal(false);
    router.replace(href);
  };
  return (
    <View p={"$2"}>
      <Button
        size="xs"
        variant="outline"
        bg="$darkBlue500"
        marginRight={"auto"}
        onPress={() => handelClose("/auth/login")}
      >
        <ButtonIcon>
          <AntDesign name="home" color="white" />
        </ButtonIcon>
        <ButtonText color="white" ml={"$2"}>
          Login
        </ButtonText>
      </Button>
      <Button
        size="xs"
        variant="outline"
        bg="$darkBlue500"
        marginRight={"auto"}
        onPress={() => handelClose("/requirements/add")}
      >
        <ButtonIcon>
          <AntDesign name="home" color="white" />
        </ButtonIcon>
        <ButtonText color="white" ml={"$2"}>
          Crear Requerimiento
        </ButtonText>
      </Button>
      <Text>homePage</Text>
      {isLoggedIn === true ? (
        <Text>Estas Logeado</Text>
      ) : (
        <Text>No estas Logeado</Text>
      )}
      {network?.isInternetReachable === true ? (
        <Text>Tienes internet</Text>
      ) : (
        <Text>No tienes internet</Text>
      )}
      {type === "cellular" && <Text>Potencia de datos: {typeSignal}</Text>}
      {type === "wifi" && <Text>Potencia de wifi: {wifiSignal}</Text>}
      <Text>Tipo de Red: {type}</Text>
    </View>
  );
}
