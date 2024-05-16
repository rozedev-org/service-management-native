import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { axiosInstace } from "@/utils/axiosInstance";
import { Box, HStack, VStack, View, Text } from "@gluestack-ui/themed";

export default function UsersPage() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const login = await axiosInstace.post(`/auth/login`, {
        username: `hd`,
        password: `hd`,
      });
      const response = await axiosInstace.get<PaginatedResponse<UserEntity>>(
        `/users?page=1`
      );
      setUsers(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <View>
      <FlatList<UserEntity>
        data={users}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="$1"
            borderColor="$trueGray800"
            $dark-borderColor="$trueGray100"
            $base-pl={0}
            $base-pr={0}
            $sm-pl="$4"
            $sm-pr="$5"
            py="$2"
          >
            <HStack space="md" justifyContent="space-between">
              <VStack>
                <Text
                  color="$coolGray800"
                  fontWeight="$bold"
                  $dark-color="$warmGray100"
                >
                  {item.userName}
                </Text>
                <Text color="$coolGray600" $dark-color="$warmGray200">
                  {item.firstName} {item.lastName}
                </Text>
              </VStack>
              <Text
                fontSize="$xs"
                color="$coolGray800"
                alignSelf="flex-start"
                $dark-color="$warmGray100"
              >
                {item.id}
              </Text>
            </HStack>
          </Box>
        )}
      />
    </View>
  );
}
