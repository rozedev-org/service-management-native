import { axiosInstace } from "@/common/utils/axiosInstance";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/types/response.interface";
import { useState } from "react";

export const useUsers = () => {
  const fetchUsers = async (queryPamas: PaginationParams) => {
    try {
      const response = await axiosInstace.get<PaginatedResponse<UserEntity>>(
        `/users`,
        { params: queryPamas }
      );
      setIsLoading(false);
      setUsers(response.data.data);
      if (response) {
        setOfflineData(response.data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const [offlineData, setOfflineData] = useState<UserEntity[]>([]);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return { fetchUsers, users, offlineData, isLoading };
};

export const useUser = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserEntity>({
    id: 0,
    userName: "",
    lastName: "",
    firstName: "",
    password: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const fetchUser = async () => {
    try {
      const response = await axiosInstace.get<UserEntity>(`/users/${id}`);
      setUser(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { user, setUser, fetchUser, isLoading };
};
