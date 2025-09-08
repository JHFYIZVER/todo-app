import { createMutation } from "@farfetched/core";
import { createEffect, sample } from "effector";
import { RegistrationSchemaType } from "../lib/schema";
import { api } from "@/shared/api/api-client";
import { toast } from "sonner";

export const registerMutation = createMutation({
  effect: createEffect<RegistrationSchemaType, any, Error>({
    handler: async (data: RegistrationSchemaType) => {
      try {
        const response = await api.post("auth/register", data);
        return response;
      } catch (error: any) {
        throw new Error(error.message || "Ошибка при регистрации");
      }
    },
  }),
});

sample({
  clock: registerMutation.finished.success,
  fn: () => {
    toast.success("Вы успешно зарегистрировались!");
    return null;
  },
});

sample({
  clock: registerMutation.finished.failure,
  fn: ({ error }) => {
    toast.error(error.message || "Ошибка при регистрации");
    return null;
  },
});
