import PocketBase from "pocketbase";

const url = "https://ramiriqui.pockethost.io/";
const pb = new PocketBase(url);

const useAuthHook = () => {
  const login = async (
    numberDocument: string,
    email: string
  ): Promise<void> => {
    const record = await pb
      .collection("pendingUsers")
      .create({ numberDocument, email });
    console.log(record);
  };

  const logut = () => {};
  return { login, logut };
};

export default useAuthHook;
