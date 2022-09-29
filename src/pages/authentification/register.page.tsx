import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import type { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { authenticationApi } from 'api';
import { useUserContext } from 'context/user.context';
import { routes } from 'resources/routes';
import { RegisterDto } from 'dto';
import Button from 'components/common/Button';

export const getServerSideProps = ssrHandler<{}>(async (context) => {
  if (context.req.session.user)
    return {
      redirect: {
        permanent: false,
        destination: routes.users.page(context.req.session.user.slug),
      },
    };

  return { props: {} };
});

const defaultValues: RegisterDto = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const resolver = classValidatorResolver(RegisterDto);

const RegisterPage: Page = () => {
  const { signIn } = useUserContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({ defaultValues, resolver });

  const onSubmit = async (values) => {
    try {
      const { user } = await authenticationApi.register(values);
      signIn(user);
      await router.push(routes.users.page(user.slug));
    } catch (e) {}
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-50">
      <div className="max-w-md w-full bg-white border rounded shadow-lg p-6">
        <div className="mb-4">
          <p className="text-gray-600">Inscription</p>
          <h2 className="text-xl font-bold">
            Rejoignez{' '}
            <span className="font-gang-of-three">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...register('email')}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <Input placeholder="Kalat" {...register('username')} />
                {errors.username && (
                  <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Mot de passe</FormLabel>
                <Input type="password" placeholder="*****" {...register('password')} />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirmez vote mot de passe</FormLabel>
                <Input
                  type="password"
                  placeholder="*****"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
                )}
              </FormControl>
            </div>
            <div>
              <Button type="submit">Inscription</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
