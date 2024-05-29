import { View, Text } from "react-native";
import React from "react";
import { Avatar, AvatarFallbackText, Box, HStack } from "@gluestack-ui/themed";
import { ReqModal } from "./ReqModal";

export const ReqCard = () => {
  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }
  return (
    <View>
      <HStack>
        <Avatar bgColor={randomColor()} size="md" borderRadius="$full">
          <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
        </Avatar>
        <Box>
          <ReqModal />
        </Box>
        <Text>REQ-12</Text>
      </HStack>
    </View>
  );
};
