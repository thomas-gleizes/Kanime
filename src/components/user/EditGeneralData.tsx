import React, { useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { commonApi } from 'api';
import { ApiService } from 'services/api.service';
import { useUserContext } from 'context/user.context';
import { routes } from 'resources/routes';
import { File } from 'components/common/formik';
import { ApiException } from 'exceptions';
import { UpdateUserDto } from 'dto/user.dto';

const fetchCountries = () => commonApi.showCountries().then((data) => data.countries);

const EditGeneralData: Component = () => {
  const { user, signIn } = useUserContext();

  const formRef = useRef<Nullable<FormikProps<UpdateUserDto>>>(null);
  const avatarRef = useRef<HTMLInputElement>();
  const backgroundRef = useRef<HTMLInputElement>();

  const { isLoading, data } = useQuery<Countries>(['countries'], fetchCountries);

  if (!user) return null;

  const initialValues: UpdateUserDto = {
    avatar: user.avatarPath,
    background: user.backgroundPath,
    gender: user.gender,
  };

  const handleSubmit = async (values: UpdateUserDto) => {
    try {
      const {
        data: { user },
      } = await ApiService.patch(routes.users.api.current, values);

      signIn(user);
    } catch (err) {
      if (err instanceof ApiException) toast.error(err.message);
      else toast.error('Une erreur est survenue');

      // TODO setFieldError with formik and class-validator schema
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
                onClick={() => backgroundRef.current?.click()}
                className="absolute w-full h-full rounded-t-md bg-center bg-no-repeat bg-auto bg-clip-content"
                style={{
                  background: `url('${displayBackgroundUrl(values.background)}')`,
                }}
              />
              <File innerRef={backgroundRef} name="background" />
              <div
                onClick={() => avatarRef.current?.click()}
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

export default EditGeneralData;
