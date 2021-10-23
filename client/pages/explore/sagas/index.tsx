import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { SagaApi } from "../../../api";
import { ApiError, Saga } from "../../../helpers/interfaces/global";
import Layout from "../../../components/layouts/Layout";
import LayoutListing from "../../../components/layouts/LayoutListing";

interface Props {
  error?: ApiError;
  sagas?: Array<Saga>;
}

export const getServerSideProps = async ({ query }) => {
  let props: Props = {};
  try {
    const { data } = await SagaApi.all({ ...query });
    props.sagas = data.sagas;
  } catch (error) {
    props.error = error;
  }

  return { props };
};

const ExploreSagas: React.FC<Props> = ({ sagas, error }) => {
  return (
    <Layout className="px-6 pb-20">
      <Head>
        <title>Sagas | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <div className="w-full mt-20">
        <h2 className="text-2xl text-center">Les sagas</h2>
      </div>
      <LayoutListing>
        <div className="max-w-1050">
          <div className="grid grid-cols-4 p-3">
            {sagas?.map((saga, index) => (
              <div key={index} className="w-full mx-auto px-2 min-w-200 max-w-200">
                <div className="my-3 bg-primary shadow hover:shadow-lg cursor-pointer transform hover:scale-110 transition border rounded-b rounded-lg">
                  <Link href={`/saga/${saga.slug}`}>
                    <a>
                      <div className="flex justify-center">
                        <Image
                          src={saga.poster.small}
                          width={250}
                          height={340}
                          alt={saga.libelle}
                          className="mx-auto"
                        />
                      </div>
                      <h3 className="text-center text-white font-bold py-1 truncate px-1">
                        {saga.libelle}
                      </h3>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutListing>
    </Layout>
  );
};

export default ExploreSagas;
