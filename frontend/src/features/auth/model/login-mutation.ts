import { createMutation } from "@farfetched/core";
import { createEffect, sample } from "effector";
import { LoginSchemaType } from "../lib/schema";
import { api } from "@/shared/api/api-client";
import { toast } from "sonner";

export const loginMutation = createMutation({
  effect: createEffect<LoginSchemaType, any, Error>(
    async (data: LoginSchemaType) => {
      try {
        const response = await api.post("auth/login", data);
        return response;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Ошибка при входе");
      }
    }
  ),
});

sample({
  clock: loginMutation.finished.success,
  fn: () => {
    toast.success("Вы успешно вошли в свой аккаунт!");
    return null;
  },
});

sample({
  clock: loginMutation.finished.failure,
  fn: ({ error }) => {
    toast.error(error.message || "Ошибка при входе");
    return null;
  },
});
