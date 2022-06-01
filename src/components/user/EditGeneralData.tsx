import React, { useRef } from 'react';
import { Gender } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';

import { PrismaCountries } from 'prisma/app';
import { ApiService } from 'services/api.service';
import { useUserContext } from 'context/user.context';
import { useFetch } from 'hooks';
import toast from 'utils/toastr';
import { routes } from 'resources/routes';
import { File } from 'components/common/formik';

declare type values = {
  city: string;
  birthday: Date | string;
  bio: string;
  avatar: UserMediaHandling | string;
  background: UserMediaHandling | string;
  gender: Gender;
};

const fetchCountry = (): any =>
  ApiService.get<PrismaCountries>(routes.common.countries.list);

const EditUserModal: React.FunctionComponent = () => {
  const { user, signIn } = useUserContext();

  const formRef = useRef<FormikProps<values>>();
  const avatarRef = useRef<HTMLInputElement>();
  const backgroundRef = useRef<HTMLInputElement>();

  const [{ countries }] = useFetch<{ countries?: any[] }>(fetchCountry);

  if (!user) return null;

  const initialValues: values = {
    city: user.city,
    birthday: user.birthday,
    bio: user.bio,
    avatar: user.avatarPath,
    background: user.backgroundPath,
    gender: user.gender,
  };

  const handleSubmit = async (values: values) => {
    try {
      const {
        data: { user, token },
      } = await ApiService.patch(routes.users.api.current, values);

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
    <div className="p-10">
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUserModal;
