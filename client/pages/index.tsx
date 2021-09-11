import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layouts/Layout";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    console.clear();
    router.push("/explore/animes");
  }, []);

  return <Layout className="text-center text-xl mt-5">Coming soon .. ..</Layout>;
};

export default Home;
