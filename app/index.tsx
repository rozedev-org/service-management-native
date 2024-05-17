import { Text, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export default function Index() {
  const [network, setNetwork] = useState<NetInfoState>();
  const [wifiSignal, setWifiSignal] = useState<number | null>(null);
  const [typeSignal, setTypeSignal] = useState<string | null>("Innacesible");
  const [type, setType] = useState<string | null>("Innacesible");
  useEffect(() => {
    const intervalId = setInterval(() => {
      NetInfo.fetch().then((state) => {
        setNetwork(state);
        setType(state.type);
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

  return (
    <View p={"$2"}>
      <Text>homePage</Text>

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
