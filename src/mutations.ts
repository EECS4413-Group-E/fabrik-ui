import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser, } from "./Api";
import { tokenStore } from "./tokenStore";

export const useRegisterMutation = () => useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => { tokenStore.set(data.accessToken); }
});

export const useLoginMutation = () => useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => { tokenStore.set(data.accessToken); }
});