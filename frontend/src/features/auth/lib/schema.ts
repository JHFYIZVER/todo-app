import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type LoginFormErrors = z.ZodFlattenedError<LoginSchemaType> | null;

export const registrationSchema = loginSchema
  .extend({
    displayName: z.string().min(2, "Имя должно состоять минимум из 2 символов"),
    repeatPassword: z
      .string()
      .min(6, "Пароль подтверждения должен состоять минимум из 6 символов"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
export type RegistrationFormErrors =
  z.ZodFlattenedError<RegistrationSchemaType> | null;
