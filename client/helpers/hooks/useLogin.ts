import { useEffect } from "react";
import { useUserContext } from "../../context/user";
import { useRouter } from "next/router";

const useLogin = () => {
  const { isLogin } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);
};

export default useLogin;
