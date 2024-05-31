import { View } from "react-native";
import React, { useEffect } from "react";
import { useBoard } from "./hooks/useBoard";
import { useRefreshSignal } from "./states/useRefreshSignal";
import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";
import { ReqStateColumn } from "./components/ReqStateColumn";

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
      <HStack pt={20}>
        <Text mr={"auto"} ml={15}>
          Lista
        </Text>
        <Button ml={"auto"} mr={15}>
          <ButtonText>Crear</ButtonText>
        </Button>
      </HStack>

      <Center mt={60} mb={3} ml={15}>
        <HStack gap={10}>
          <ScrollView horizontal={true}>
            {boardState.map((board) => (
              <ReqStateColumn
                key={`req-state-column-${board.id}`}
                requirements={board.requirement}
                title={board.title}
                id={board.id}
              />
            ))}
          </ScrollView>
        </HStack>
      </Center>
    </View>
  );
};

export default BoardPage;
