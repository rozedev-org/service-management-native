import { View, Text } from "react-native";
import React from "react";
import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Button } from "@gluestack-ui/themed";

const reqs = [1, 2, 3, 4, 5];

export default function ReqDetailPage() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
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
        >
          <Link href={`requirements/detail/${req}`}>Requerimiento {req}</Link>
        </Button>
      ))}
    </View>
  );
}
