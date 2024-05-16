import { Product } from "@/types/product.types";
import { axiosInstace } from "@/utils/axiosInstance";
import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import axios from "axios";
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("entre");
    const fetchUsers = async () => {
      console.log("fetch");
      try {
        const login = await axiosInstace.post(
          `/auth/login`,
          {
            username: `hd`,
            password: `hd`,
          },
          {
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            },
          }
        );
        console.log("login", login);
        const response = await axiosInstace.get<PaginatedResponse<UserEntity>>(
          `/users?page=1`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    console.log(users);
  }, []);

  return (
    <View>
      <FlatList<Product>
        data={products}
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
              <Avatar size="md">
                <AvatarImage
                  source={{ uri: item.thumbnail }}
                  alt={item.title}
                />
              </Avatar>
              <VStack>
                <Text
                  color="$coolGray800"
                  fontWeight="$bold"
                  $dark-color="$warmGray100"
                >
                  {item.title}
                </Text>
                <Text color="$coolGray600" $dark-color="$warmGray200">
                  {item.description}
                </Text>
              </VStack>
              <Text
                fontSize="$xs"
                color="$coolGray800"
                alignSelf="flex-start"
                $dark-color="$warmGray100"
              >
                {item.price}
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
