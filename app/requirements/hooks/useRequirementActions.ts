import { axiosInstace } from "@/common/utils/axiosInstance";
import { ReqActionsActions } from "../types/requirement-action.types";
import { useState } from "react";

export const useReqActions = (reqId: number) => {
  const fetchReqActions = async () => {
    try {
      const response = await axiosInstace.get<ReqActionsActions>(
        `/requirements/actions/${reqId}`
      );
      setReqActions(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateReqAction = async (newReqStateId: number) => {
    try {
      await axiosInstace.put(`/requirements/${reqId}`, {
        stateId: newReqStateId,
      });
      await fetchReqActions();
    } catch (error) {
      console.log(error);
    }
  };
  const [reqActions, setReqActions] = useState<ReqActionsActions>({
    current: {
      id: 0,
      title: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      secuence: 0,
    },
    remaining: [],
  });
  return { reqActions, fetchReqActions, updateReqAction };
};
