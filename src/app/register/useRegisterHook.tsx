import {
  RegisterUserRequest,
  usePostRegisterUserMutation,
} from "@/api/services/registerUsersApi";
import { routersNames } from "@/constants/routes";
import { setUserSlice } from "@/providers/redux/slices/authSlice";
import { setTokenSlice } from "@/providers/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useRegisterHook = () => {
  const [postRegister, { isLoading }] = usePostRegisterUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const register = async (request: RegisterUserRequest): Promise<void> => {
    try {
      const { id } = await postRegister(request).unwrap();
      // dispatch(setTokenSlice(token));
      // dispatch(setUserSlice(record));
      console.log(id);

      // setNewAlert({ text: email, title: "Bienvendio", icon: "success" });
      router.push(routersNames.HOME);
    } catch (error) {
      // setNewAlert({
      //   text: email,
      //   title: "Credenciales incorrectas",
      //   icon: "error",
      // });
      console.error(error);
    }
    // const record = await pb
    //   .collection("pendingUsers")
    //   .create({ numberDocument, email });
    // console.log(record);
  };

  return { register, isLoading };
};

export default useRegisterHook;
