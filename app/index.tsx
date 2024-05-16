import { Product } from "@/types/product.types";
import { axiosInstace } from "@/utils/axiosInstance";
import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
interface PaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
interface UserEntity {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export default function Index() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("https://dummyjson.com/products");
  //       setProducts(response.data.products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    //   console.log("fetch");
    try {
      const login = await axiosInstace.post(`/auth/login`, {
        username: `jc`,
        password: `jc`,
      });
      const response = await axiosInstace.get<PaginatedResponse<UserEntity>>(
        `/users?page=1`
      );
      setUsers(response.data.data);
    } catch (error: any) {
      console.log(error.message);
      console.log("--------------------------------------------------------\n");
      console.log(error.name);
      console.log("--------------------------------------------------------\n");
      console.log(error.code);
      console.log("--------------------------------------------------------\n");
      console.log(error.config);
      console.log("--------------------------------------------------------\n");
      console.log(error.request);
    }
  };

  return (
    <View>
      <Button
        onPress={async () => {
          await fetchUsers();
        }}
      >
        <Text>Hola</Text>
      </Button>
      <Button
        onPress={async () => {
          console.log(users);
        }}
      >
        <Text>users</Text>
      </Button>
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
    // <View>
    //   <VStack>
    //     {products.map((data: Product) => (
    //       <View>
    //         <Text>{data.title}</Text>
    //       </View>
    //     ))}
    //   </VStack>
    // </View>
  );
}
