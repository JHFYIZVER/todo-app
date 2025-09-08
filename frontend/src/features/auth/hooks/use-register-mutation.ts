import { useUnit } from "effector-react";
import { registerMutation } from "../model/register-mutation";

export const useRegisterMutation = () => {
  const { start, $pending, $status, $succeeded, $failed } = useUnit({
    start: registerMutation.start,
    $pending: registerMutation.$pending,
    $status: registerMutation.$status,
    $succeeded: registerMutation.$succeeded,
    $failed: registerMutation.$failed,
  });

  return {
    mutate: start,
    isPending: $pending,
    status: $status,
    isSuccess: $succeeded,
    isError: $failed,
  };
};
