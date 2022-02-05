import React, { useRef } from 'react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Country, Gender } from '@prisma/client';

import { UserMediaHandling } from '@types';
import { useUserContext } from '@context/user.context';
import { useFetch } from '@hooks';
import appAxios from '@lib/axios/appAxios';
import toast from '@helpers/toastr';
import Button from '@components/common/Button';
import { Field, File, Select, Textarea } from '@components/common/formik';
import { CardBody, CardFooter } from '@layouts/card';
import { routes } from '@lib/constants';

declare type values = {
  city: string;
  birthday: Date | string;
  bio: string;
  avatar: UserMediaHandling | string;
  background: UserMediaHandling | string;
  gender: Gender;
};

const fetchCountry = () => appAxios.get<Country[]>(routes.common.countries.list);

const EditUserModal: React.FunctionComponent = () => {
  const { user, signIn } = useUserContext();

  const formRef = useRef<FormikProps<values>>();
  const avatarRef = useRef<HTMLInputElement>();
  const backgroundRef = useRef<HTMLInputElement>();

  const [{ countries }] = useFetch(fetchCountry);

  if (!user) return null;

  const initialValues: values = {
    city: user.city,
    birthday: user.birthday,
    bio: user.bio,
    avatar: user.avatarPath,
    background: user.backgroundPath,
    gender: user.gender,
  };

  const handleSubmit = async (values: values, formik: FormikHelpers<values>) => {
    try {
      const {
        data: { user, token },
      } = await appAxios.patch(routes.users.api.current, values);

      signIn(user, token);
    } catch (e) {
      toast(e.message, 'error');

      // TODO setFieldError with formik and yup schema
    }
  };

  const displayBackground = (media: UserMediaHandling | string) => {
    if (typeof media === 'string') return media;
    else return media.raw;
  };

  return (
    <div>
      <Formik innerRef={formRef} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <div className="relative h-300">
              <div
                onClick={() => backgroundRef.current.click()}
                className="absolute w-full h-full rounded-t-md bg-center bg-no-repeat bg-auto bg-clip-content"
                style={{ background: `url('${displayBackground(values.background)}')` }}
              />
              <File innerRef={backgroundRef} name="background" />
              <div
                onClick={() => avatarRef.current.click()}
                className="absolute w-[260px] h-[260px] top-[20px] rounded-full right-10 bg-no-repeat bg-center"
                style={{ background: `url(${displayBackground(values.avatar)})` }}
              />
              <File innerRef={avatarRef} name="avatar" />
            </div>

            <CardBody className="p-8">
              <div className="flex">
                <Select name="country" label="Pays">
                  <option value="">Secret</option>
                  {countries?.map((country: Country) => (
                    <option key={country.id} value={country.id}>
                      {country.iso} - {country.name}
                    </option>
                  ))}
                </Select>
                <Field type="text" name="city" label="Ville" />
              </div>
              <div className="flex">
                <Field type="date" name="birthday" label="Date de naissance" />
                <Select name="gender" label="Genre">
                  {Object.values(Gender).map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Textarea name="bio" label="Bio" />
              </div>
            </CardBody>
            <CardFooter className="flex justify-between bg-gray-200 py-3 px-4 rounded-b">
              <Button color="amber" type="submit">
                Enregistrer
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUserModal;
