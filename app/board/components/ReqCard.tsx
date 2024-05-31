import { View } from "react-native";
import React from "react";
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Center,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import { ReqModal } from "./ReqModal";
import { RequirementEntity } from "@/app/requirements/types/requirements.types";
interface ReqCardProps {
  requirement: RequirementEntity;
}
export const ReqCard = (props: ReqCardProps) => {
  const { user } = props.requirement;
  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }
  return (
    <View>
      <HStack
        m={3}
        alignItems="center"
        w={"100%"}
        backgroundColor="$blueGray300"
        borderRadius={"$xl"}
        p={5}
        gap={10}
      >
        <Avatar bgColor={randomColor()} size="sm" borderRadius="$2xl">
          <AvatarFallbackText>{user?.userName || ""}</AvatarFallbackText>
        </Avatar>
        <ReqModal requirement={props.requirement} />
      </HStack>
    </View>
  );
};
