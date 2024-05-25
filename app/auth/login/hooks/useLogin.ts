import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { axiosInstace } from "@/common/utils/axiosInstance";
import { LoginEntity } from "../types/login.types";
export const useLoginForm = () => {
  const LoginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<LoginEntity>(
          `/auth/login`,
          value
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { LoginForm };
};
