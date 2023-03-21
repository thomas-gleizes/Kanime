import React from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'

import { Page } from 'app/next'
import { authenticationApi } from 'api'
import { ssrHandler } from 'services/handler.service'
import { resetPasswordSchema } from 'resources/validations'
import { ApiException } from 'exceptions'
import { userModel } from 'models'
import { routes } from 'resources/routes'
import { Field } from 'components/common/formik'
import Button from 'components/common/Button'

type resetPasswordPayload = Yup.TypeOf<typeof resetPasswordSchema>

interface Props {
  token: string
}

export const getServerSideProps = ssrHandler<Props, { token: string }>(async (context) => {
  const { token } = context.query

  const user = await userModel.checkResetPasswordToken(token as string)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: routes.authentification.signIn
      }
    }
  } else
    return {
      props: { token: token as string }
    }
})

const ResetPasswordPage: Page<Props> = ({ token }) => {
  const router = useRouter()

  const initialValues: resetPasswordPayload = {
    newPassword: 'azerty',
    confirmPassword: 'azerty',
    token: token
  }

  const handleSubmit = async (values: resetPasswordPayload) => {
    try {
      await authenticationApi.resetPassword(values)

      toast.success('Votre mot de passe a bien été changé')
      await router.push(routes.authentification.signIn)
    } catch (err) {
      if (err instanceof ApiException) toast.error(err.message)
      else toast.error('Une erreur est survenue')
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-50">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={resetPasswordSchema}
      >
        <Form className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Réinitialiser votre mot de passe</h2>
          </div>
          <div>
            <Field type="password" name="newPassword" label="Nouveau mot de passe" required />
          </div>
          <div>
            <Field type="password" name="confirmPassword" label="Confirmer mot de passe" required />
          </div>
          <div>
            <Button type="submit">Confirmer</Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ResetPasswordPage
