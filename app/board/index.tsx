import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useBoard } from "./hooks/useBoard";
import { useRefreshSignal } from "./states/useRefreshSignal";
import { Button, HStack } from "@gluestack-ui/themed";
import { ReqCard } from "./components/ReqCard";

const BoardPage = () => {
  const { boardState, fetchBoard, isLoading } = useBoard();
  const { onRefresh, setOnRefresh } = useRefreshSignal();
  useEffect(() => {
    fetchBoard();
  }, []);
  useEffect(() => {
    if (onRefresh) {
      fetchBoard();
      setOnRefresh(false);
    }
  }, [onRefresh]);

  return (
    <View>
      <HStack>
        <ReqCard />
        <Text>Column</Text>
      </HStack>
    </View>
  );
};

export default BoardPage;
