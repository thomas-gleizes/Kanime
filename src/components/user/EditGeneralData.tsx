import React, { useRef } from 'react';
import { Gender } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';

import { ApiService } from 'services/api.service';
import { useUserContext } from 'context/user.context';
import { routes } from 'resources/routes';
import { File } from 'components/common/formik';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { commonApi } from 'api';

declare type values = {
  city: string;
  birthday: Date | string;
  bio: string;
  avatar: UserMediaHandling | string;
  background: UserMediaHandling | string;
  gender: Gender;
};

const fetchCountries = () => commonApi.showCountries().then((data) => data.countries);

const EditUserModal: React.FunctionComponent = () => {
  const { user, signIn } = useUserContext();

  const formRef = useRef<FormikProps<values>>();
  const avatarRef = useRef<HTMLInputElement>();
  const backgroundRef = useRef<HTMLInputElement>();

  const { isLoading, data } = useQuery<Countries>(['countries'], fetchCountries);

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
      toast.error(e.message || 'Une erreur est survenue');

      // TODO setFieldError with formik and yup schema
    }
  };

  const displayBackgroundUrl = (media: UserMediaHandling | string) => {
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
                style={{
                  background: `url('${displayBackgroundUrl(values.background)}')`,
                }}
              />
              <File innerRef={backgroundRef} name="background" />
              <div
                onClick={() => avatarRef.current.click()}
                className="absolute w-[260px] h-[260px] top-[20px] rounded-full right-10 bg-no-repeat bg-center"
                style={{ background: `url(${displayBackgroundUrl(values.avatar)})` }}
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
