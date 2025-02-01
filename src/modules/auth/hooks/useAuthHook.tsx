import { usePostLoginMutation } from "@/api/services/loginApi";
import useAlert from "@/components/alerts/useAlert";
import { routersNames } from "@/constants/routes";
import { useRouter } from "next/navigation";

// const url = "https://ramiriqui.pockethost.io/";
// const pb = new PocketBase(url);

const useAuthHook = () => {
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const { setNewAlert } = useAlert();
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { token } = await postLogin({ identity: email, password }).unwrap();
      // setNewAlert({ text: email, title: "Bienvendio", icon: "success" });
      router.push(routersNames.DASHBOARD);
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
