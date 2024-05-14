import { View, Text } from "react-native";
import React from "react";
import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { router } from "expo-router";
const reqs = [1, 2, 3, 4, 5];

export default function ReqDetailPage() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const handleRoute = (href: string) => {
    router.replace(href);
  };
  return (
    <View>
      <Text>Detalles</Text>
      {reqs.map((req) => (
        <Button
          key={req}
          action="negative"
          height={"$9"}
          width={"$40"}
          mt={"$2"}
          onPress={() => handleRoute(`requirements/detail/${req}`)}
        >
          <ButtonText>Requerimiento {req}</ButtonText>
        </Button>
      ))}
    </View>
  );
}
