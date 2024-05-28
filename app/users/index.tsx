import { FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { axiosInstace } from "@/common/utils/axiosInstance";
import {
  Box,
  HStack,
  VStack,
  View,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaginatedResponse } from "@/types/response.interface";

export default function UsersPage() {
  const [inputValue, setInputValue] = useState("");
  const [storedArray, setStoredArray] = useState<string[]>([]);

  useEffect(() => {
    // Obtener el array almacenado cuando la aplicación se inicia
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@storage_Key");
        if (jsonValue !== null) {
          setStoredArray(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  const storeData = async () => {
    try {
      const newArray = [...storedArray, inputValue];
      const jsonValue = JSON.stringify(newArray);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      setStoredArray(newArray);
      setInputValue("");
    } catch (e) {
      console.error(e);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      setStoredArray([]);
    } catch (e) {
      console.error(e);
    }
  };
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [offlineData, setOfflineData] = useState<UserEntity[]>([]);

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
      if (response) {
        setOfflineData(response.data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // const clearStorage = async () => {
  //   try {
  //     await AsyncStorage.removeItem("Offline_Data");
  //     setOfflineData([]);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  const getOfflineData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Offline_Data");
      if (jsonValue !== null) {
        setOfflineData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveOfflineData = async () => {
    try {
      const jsonValue = JSON.stringify(offlineData);
      await AsyncStorage.setItem("Offline_Data", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    saveOfflineData();
    getOfflineData();
  }, []);

  const setoffline = async () => {
    const data = [
      {
        id: 10,
        userName: "username",
        firstName: "string",
        lastName: "string",
        password: "string",
      },
    ];
    setOfflineData(data);
  };

  return (
    <View p={"$2"}>
      {/* <Button onPress={() => console.log(offlineData)} m={"$5"}>
            <ButtonText>get Offline</ButtonText>
          </Button>
          <Text>{offlineData.length}</Text>
          <Button onPress={() => console.log(users)} m={"$5"}>
            <ButtonText>get Online</ButtonText>
          </Button>
          <Text>{users.length}</Text>
          <Button onPress={() => saveOfflineData()} m={"$5"}>
            <ButtonText>saveOfflineData</ButtonText>
          </Button>
          <Button onPress={() => getOfflineData()} m={"$5"}>
            <ButtonText>getOfflineData</ButtonText>
          </Button>
          <Button onPress={() => clearStorage()} m={"$5"}>
            <ButtonText>clearStorage</ButtonText>
          </Button> */}
      {/* <Text>Online</Text>
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
        </>
      ) : (
        <>
          <Button onPress={setoffline}>
            <ButtonText>setoffline</ButtonText>
          </Button>
          <Text>Offline</Text>
          <FlatList<UserEntity>
            data={offlineData}
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
        </>
      )} */}
      <Text>AsyncStorage Array Example</Text>
      <TextInput
        placeholder="Enter some text"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button onPress={storeData}>
        <ButtonText>Guarda</ButtonText>
      </Button>
      <Button onPress={clearStorage}>
        <ButtonText>Limpiar</ButtonText>
      </Button>
      {storedArray.length > 0 ? (
        <FlatList
          data={storedArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      ) : (
        <Text>No values stored</Text>
      )}
    </View>
  );
}
