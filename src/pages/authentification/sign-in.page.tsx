import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'

import { Page } from 'app/next'
import { authenticationApi } from 'api'
import { ssrHandler } from 'services/handler.service'
import { useUserContext } from 'context/auth.context'
import { routes } from 'resources/routes'
import { SignInDto } from 'dto'
import { ApiException } from 'exceptions'
import Button from 'components/common/Button'

export const getServerSideProps = ssrHandler(async (context) => {
  if (context.req.session.user)
    return {
      redirect: {
        permanent: false,
        destination: routes.users.page(context.req.session.user.slug)
      }
    }

  return { props: {} }
})

const resolver = classValidatorResolver(SignInDto)

const defaultValues: SignInDto = {
  email: 'kalat@kanime.fr',
  password: 'azerty',
  rememberMe: true
}

const SignInPage: Page = () => {
  const { signIn } = useUserContext()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInDto>({
    defaultValues,
    resolver
  })

  const onSubmit = async (data: SignInDto) => {
    try {
      const response = await authenticationApi.signIn(data)

      signIn(response.user)
      await router.push(routes.users.page(response.user.slug))
    } catch (err) {
      if (err instanceof ApiException) toast.error(err.message)
      else toast.error('Une erreur est survenue')
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-50 mx-2">
      <div className="max-w-md w-full bg-white border rounded shadow-lg p-6">
        <div className="mb-4">
          <p className="text-gray-600">Connexion</p>
          <h2 className="text-xl font-bold">
            Rejoignez{' '}
            <span className="font-gang-of-three">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
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
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" placeholder="*****" {...register('password')} />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
            <div className="mt-3">
              <Button type="submit">Connexion</Button>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  {...register('rememberMe')}
                />
                <label
                  htmlFor="comments"
                  className="ml-2 text-sm font-normal text-gray-600"
                >
                  Se souvenir de moi
                </label>
              </div>
              <div>
                <Link
                  href={routes.authentification.forgotPassword}
                  className="text-sm text-blue-600 hover:underline"
                >
                  mot de passe oublié ?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInPage
