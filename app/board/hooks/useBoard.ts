import { useState } from "react";
import { BoardEntity } from "../types/board.types";
import { axiosInstace } from "@/common/utils/axiosInstance";

export const useBoard = () => {
  const fetchBoard = async () => {
    try {
      const response = await axiosInstace.get<BoardEntity[]>(
        `/board?page=${1}`,
        {
          withCredentials: true,
        }
      );
      setBoardState(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [boardState, setBoardState] = useState<BoardEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return { fetchBoard, boardState, setBoardState, isLoading };
};
