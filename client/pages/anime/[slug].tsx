import { useRouter } from "next/router";
import Head from "next/head";
import { FaHeart, FaPlus, FaStar } from "react-icons/fa";

import { AnimeApi } from "../../api";
import { useFetch } from "../../helpers/hooks";
import Layout from "../../components/layouts/Layout";
import Image from "../../components/common/Image";
import KitsuButton from "../../components/common/KitsuButton";

const Anime = () => {
  const {
    query: { slug },
  } = useRouter();

  const [{ anime }] = useFetch(AnimeApi.slug, slug, [slug], null, !!slug);

  return (
    <Layout>
      <Head>
        <title>
          {anime?.canonicalTitle} | {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
      </Head>
      <div className="relative mb-20">
        <div
          className="absolute top-0 bottom-0 -z-10 w-full h-full bg-gradient-to-b from-red-800 bg-cover bg-center"
          style={{
            backgroundImage: `url('${anime?.cover?.small}')`,
            height: "330px",
          }}
        />
        <div
          className="flex z-30 w-full mx-auto px-10 lg:px-2"
          style={{ maxWidth: "1200px", paddingTop: "240px" }}
        >
          <div className="mx-1 w-full">
            <div className="h-20 w-full border" />
            <div className="mx-1 py-3 divide-opacity-10 divide-y-2">
              <div className="flex py-1">
                <h2 className="text-3xl">{anime?.canonicalTitle}</h2>
                <span className="text-md mt-2 ml-2 text-opacity-70">({anime?.season.full})</span>
              </div>
              <div className="flex w-full py-2 justify-between">
                <div className="flex text-sm">
                  <i className="mx-1">
                    <FaStar size={18} className="text-yellow-400" />
                  </i>
                  <span>
                    Rank {anime?.rating.rank} ({anime?.rating.average}%)
                  </span>
                </div>
                <div className="flex text-sm">
                  <span>
                    Rank {anime?.popularity.rank} ({anime?.popularity.user_count})
                  </span>
                  <i className="mx-1">
                    <FaHeart size={18} className="text-red-700" />
                  </i>
                </div>
              </div>
              <div className="py-1">
                <p className="text-justify"> {anime?.description}</p>
              </div>
            </div>
          </div>
          <div className="mx-4 rounded-lg">
            <Image
              className="rounded-sm mb-3"
              src={anime?.poster.small}
              alt="poster"
              onClick={() => window?.open(`https://kitsu.io/anime/${slug}`)}
            />
            <div>
              <div className="mx-auto">
                <div className="my-1">
                  <button className="w-full text-white rounded bg-gradient-to-tl from-red-500 to-yellow-500 py-1 shadow hover:shadow-lg transition">
                    <span className="flex justify-center font-bold">
                      Ajouter
                      <i className="ml-2 my-auto">
                        <FaPlus />
                      </i>
                    </span>
                  </button>
                </div>
                <div className="my-1">
                  <KitsuButton slug={anime?.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Anime;
