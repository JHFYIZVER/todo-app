"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { useUnit } from "effector-react";
import {
  $errors,
  $formData,
  $showErrors,
  fieldChanged,
  validateForm,
} from "../model/login-form";
import { useLoginMutation } from "../hooks/use-login-mutation";

export const SignInForm = () => {
  const [formData, errors, showErrors, handleFieldChanged, handleValidateForm] =
    useUnit([$formData, $errors, $showErrors, fieldChanged, validateForm]);
  const { isPending } = useLoginMutation();
  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFieldChanged({ field, value: e.target.value });
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleValidateForm();
  };

  return (
    <Card className="max-w-lg w-full mx-auto">
      <CardHeader>
        <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
          Авторизация
        </h1>
        <p className="text-accent-foreground/80 text-[clamp(12px,2vw,16px)]">
          Чтобы войти введи ваш email и пароль
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col space-y-4 lg:space-y-6"
          onSubmit={onSubmit}
        >
          <label className="my-3 flex flex-col">
            <span
              className={`text-xs md:text-sm lg:text-base mb-2 ${
                showErrors && errors?.fieldErrors?.email ? "text-red-500" : ""
              }`}
            >
              Email
            </span>
            <Input
              disabled={isPending}
              value={formData.email}
              onChange={handleInputChange("email")}
              aria-label="email input"
              type="email"
              placeholder="Введите email"
            />
            {showErrors && errors?.fieldErrors?.email && (
              <div className="text-red-500 my-1">
                {errors.fieldErrors.email.join(", ")}
              </div>
            )}
          </label>
          <label className="my-3 flex flex-col">
            <div className="text-xs flex items-center justify-between md:text-sm lg:text-base mb-2">
              <span
                className={`text-xs md:text-sm lg:text-base ${
                  showErrors && errors?.fieldErrors?.password
                    ? "text-red-500"
                    : ""
                }`}
              >
                Пароль
              </span>
            </div>
            <Input
              disabled={isPending}
              value={formData.password}
              onChange={handleInputChange("password")}
              aria-label="password input"
              type="password"
              placeholder="Введите пароль"
            />
            {showErrors && errors?.fieldErrors?.password && (
              <div className="text-red-500 my-1">
                {errors.fieldErrors.password.join(", ")}
              </div>
            )}
          </label>
          <Button
            disabled={isPending}
            type="submit"
            aria-label="login button"
            className="w-full cursor-pointer"
          >
            Войти
          </Button>
        </form>
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="text-center flex flex-wrap items-center gap-2 justify-center">
          Нет аккаунта?
          <Link
            className="font-bold transition-all relative after:absolute after:w-0 after:h-1 after:bg-foreground hover:after:w-full after:-bottom-2 after:left-1/2 hover:after:left-0 after:transition-all after:duration-500"
            href="/auth/sign-up"
          >
            Зарегестрироваться
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
