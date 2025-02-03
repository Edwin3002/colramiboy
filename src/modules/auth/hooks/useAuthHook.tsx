import { usePostLoginMutation } from "@/api/services/loginApi";
import { routersNames } from "@/constants/routes";
import { setUserSlice } from "@/providers/redux/slices/authSlice";
import { setTokenSlice } from "@/providers/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useAuthHook = () => {
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { token, record } = await postLogin({ identity: email, password }).unwrap();
      dispatch(setTokenSlice(token))
      dispatch(setUserSlice(record))
      
      // setNewAlert({ text: email, title: "Bienvendio", icon: "success" });
      router.push(routersNames.HOME);
    } catch (error) {
      // setNewAlert({
      //   text: email,
      //   title: "Credenciales incorrectas",
      //   icon: "error",
      // });
      console.log(error);
    }
    // const record = await pb
    //   .collection("pendingUsers")
    //   .create({ numberDocument, email });
    // console.log(record);
  };

  const logut = () => {};
  return { login, isLoading, logut };
};

export default useAuthHook;
