import { View } from "react-native";
import React from "react";
import { RequirementEntity } from "@/app/requirements/types/requirements.types";
import { ReqCard } from "./ReqCard";
import { Center, HStack, VStack, Text, ScrollView } from "@gluestack-ui/themed";

export const ReqStateColumn = (props: {
  id: number;
  title: string;
  requirements: RequirementEntity[];
}) => {
  const { title } = props;
  return (
    <View>
      <VStack mr={10} p={10} backgroundColor="$darkBlue300" h={600} w={400}>
        <Text p={2}>{title}</Text>
        <ScrollView>
          {props.requirements.map((req) => (
            <ReqCard key={`req-card-${req.id}`} requirement={req} />
          ))}
        </ScrollView>
      </VStack>
    </View>
  );
};
