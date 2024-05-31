import { axiosInstace } from "@/common/utils/axiosInstance";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/types/response.interface";
import {
  NewReq,
  RequirementEntity,
  RequirementsEntity,
} from "../types/requirements.types";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
export const useRequirements = () => {
  const fetchReqs = async (queryPamas: PaginationParams) => {
    try {
      const response = await axiosInstace.get<
        PaginatedResponse<RequirementsEntity>
      >(`/requirements`, { params: queryPamas });
      setRequirements(response.data.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [requirements, setRequirements] = useState<RequirementsEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return { fetchReqs, requirements, isLoading };
};

export const useRequirement = (id: number) => {
  const fetchReq = async () => {
    const response = await axiosInstace.get<RequirementEntity>(
      `/requirements/{id}`
    );
    setRequirement(response.data);
    setIsLoading(false);
    return response.data;
  };
  const [requirement, setRequirement] = useState<RequirementEntity>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return { fetchReq, requirement, isLoading, setRequirement, setIsLoading };
};

export const useCreateReqForm = () => {
  const ReqForm = useForm<NewReq>({
    defaultValues: {
      title: "",
      userId: null,
      stateId: 1,
      requirementTypeId: 0,
      requirementFieldValue: [],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<RequirementsEntity>(
          `/requirements`,
          value
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { ReqForm };
};
export const useUpdateReqForm = (req?: RequirementEntity) => {
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateReqForm = useForm<NewReq>({
    defaultValues: {
      title: req?.title || "",
      userId: req?.userId || null,
      stateId: req?.stateId || 1,
      requirementTypeId: req?.requirementTypeId || 0,
      requirementFieldValue:
        req?.requirementFieldValue && Array.isArray(req.requirementFieldValue)
          ? req.requirementFieldValue.map((field) => ({
              requirementTypeFieldId: field.requirementTypeField.id,
              value: field.value,
            }))
          : [],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.put<RequirementsEntity>(
          `/requirements/${req?.id}`,
          value
        );
      } catch (error: any) {
        setOnError(true);
        setErrorMessage(
          error.response.data.message ||
            "Ocurrió un error al intentar actualizar el requerimiento, por favor intente nuevamente"
        );
      }
    },
  });
  return { updateReqForm, onError, errorMessage };
};
