import { useUnit } from "effector-react";
import { loginMutation } from "../model/login-mutation";

export const useLoginMutation = () => {
  const { start, $pending, $status, $succeeded, $failed } = useUnit({
    start: loginMutation.start,
    $pending: loginMutation.$pending,
    $status: loginMutation.$status,
    $succeeded: loginMutation.$succeeded,
    $failed: loginMutation.$failed,
  });

  return {
    mutate: start,
    isPending: $pending,
    status: $status,
    isSuccess: $succeeded,
    isError: $failed,
  };
};
