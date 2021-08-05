import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

import Layout from "../../components/layouts/Layout";
import AdminAnime from "../../components/common/AdminAnime";
import { AnimeApi, CategoryApi } from "../../api";
import addToast, { TOAST_ERROR } from "../../helpers/toastr";
import { Input, Label } from "../../components/common/Form";
import Card, {
  CardBody,
  CardFooter,
  CardHeader,
} from "../../components/layouts/Card";
import { useUserContext } from "../../context/user";

const animatedComponents = makeAnimated();

const Admin = () => {
  const router = useRouter();
  const [currents, setCurrents] = useState([]);
  const [values, setValues] = useState([]);
  const [title, setTitle] = useState();
  const [tags, setTags] = useState([]);

  const { isAdmin } = useUserContext();

  useEffect(() => {
    if (!isAdmin) router.push("/");
  }, [isAdmin]);

  const loadAnimes = (query, callBack) => {
    if (query.length > 2) {
      try {
        AnimeApi.search(query).then(({ data: { animes } }) => {
          callBack(
            animes
              .filter((anime) => !currents.find((cur) => cur.id === anime.id))
              .map((anime) => {
                return {
                  label: anime.canonicalTitle,
                  value: anime.id,
                  data: anime,
                };
              })
          );
        });
      } catch (error) {
        callBack([]);
        addToast(error.message, TOAST_ERROR);
      }
    } else callBack([]);
  };

  const loadTags = (query) => {
    return new Promise((resolve) => {
      if (query.length > 1) {
        try {
          CategoryApi.search(query).then(({ data }) => {
            resolve(
              data.categories.map((category) => {
                return {
                  label: category.title,
                  value: category.innerID,
                  data: category,
                };
              })
            );
          });
        } catch (error) {
          resolve([]);
          addToast(error.message, TOAST_ERROR);
        }
      } else resolve([]);
    });
  };

  const handleAdd = () => {
    const selected = values.filter(({ value }) => {
      return !currents.find((a) => a.id === value);
    });

    let tempTitle = title;
    const news = currents;
    selected.forEach((t) => {
      if (!tempTitle) tempTitle = t.data.canonicalTitle;
      news.push(t.data);
    });

    setTitle(tempTitle);
    setValues([]);
    setCurrents(news);
  };

  const handleDelete = (id) => setCurrents(currents.filter((c) => c.id !== id));

  const handleSubmit = async () => {
    const values = { media: currents.map((current) => current.id), title };
    try {
      const { data } = await AnimeApi.insert({ ...values, tags });
      console.log("response", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Layout>
      <div className="p-5">
        <Card className="sm:w-11/12 md:w-10/12 lg:w-3/4 mx-auto">
          <CardHeader>
            <h2 className="text-2xl text-center"> Ajouter un Anime </h2>
          </CardHeader>
          <CardBody className="px-4 py-3">
            <div className="flex mb-3 border-b-2 pb-4">
              <AsyncSelect
                className="w-full shadow-md hover:shadow-xl"
                autoFocus
                placeholder="Rechercher un animes a ajouter dans l'entité..."
                isMulti
                defaultOptions
                loadOptions={loadAnimes}
                value={values}
                onChange={(value) => setValues(value)}
                components={animatedComponents}
              />
              <button
                onClick={handleAdd}
                className="ml-3 bg-blue-600 rounded-md shadow-md disabled:font-bold hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 px-3 mx-1"
              >
                <span className="flex text-white">
                  Ajouter
                  <i className="my-auto h-full ml-2 mr-1">
                    <FaPlus size={17} />
                  </i>
                </span>
              </button>
            </div>
            <div>
              <div className="flex mb-2">
                <div className="w-1/3">
                  <Label> Title </Label>
                  <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </div>
                <div className="w-4/6">
                  <Label className="ml-3"> Tags </Label>
                  <AsyncSelect
                    className="ml-3"
                    defaultOptions
                    loadOptions={loadTags}
                    onChange={(values) => setTags(values)}
                    isMulti
                    placeholder="Ajouter des tags..."
                    components={animatedComponents}
                    cacheOptions
                  />
                </div>
              </div>

              {currents.length ? (
                <div className="flex w-full justify-between flex-wrap">
                  {currents.map((anime) => (
                    <AdminAnime
                      key={anime.id}
                      anime={anime}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-20" />
              )}
            </div>
          </CardBody>
          <CardFooter className="flex justify-end">
            <button
              disabled={currents.length === 0}
              className="ml-3 h-10 bg-blue-600 rounded-md shadow-md hover:shadow-xl focus:shadow-inner px-3 mx-1"
              onClick={handleSubmit}
            >
              <span className="flex text-white select-none">
                Valider
                <i className="my-auto h-full ml-2 mr-1">
                  <FaCheck size={17} />
                </i>
              </span>
            </button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
