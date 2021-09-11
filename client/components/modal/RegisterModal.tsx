import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";

import { UserApi } from "../../api";
import { useUserContextAction } from "../../context/user";
import addToast, { TOAST_ERROR } from "../../helpers/toastr";
import { FormGroup, FormikField } from "../common/Form";
import Modal, { ModalTitle, ModalBody, ModalFooter, ModalHeader } from "../layouts/Modal";

const RegisterModal = ({ openModal, handleClose }) => {
  const formRef = useRef(null);
  const { logUser } = useUserContextAction();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Veuillez indiquez un nom d'utilisateur"),
    email: Yup.string().email("Adresse email incorrect").required("Veuillez indiquer un email"),
    password: Yup.string()
      .required("Veuillez indiquer votre mot de passe")
      .min(8, "Votre mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: Yup.string()
      .required("Veuillez confirmer votre mot de passe")
      .oneOf([Yup.ref("password")], "Les mot de passe correspondent pas"),
  });

  const handleSubmit = async (values) => {
    try {
      const {
        data: { user, token },
      } = await UserApi.register(values);

      logUser(user, token);
      handleClose && handleClose();
    } catch (error) {
      addToast(error.message, TOAST_ERROR);
    }
  };

  return (
    <Modal
      className="mx-auto my-auto max-w-700 h-auto w-full bg-white border-2 mt-24 border-gray-200 rounded-md"
      isOpen={openModal}
      close={handleClose}
    >
      <ModalHeader>
        <div className="flex justify-between">
          <ModalTitle> Inscription </ModalTitle>
          <button
            onClick={handleClose}
            className="border-2 border-red-600 p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition duration-100 ease-in-out"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          innerRef={formRef}
        >
          {({ handleSubmit }) => (
            <form className="p-2" onSubmit={handleSubmit}>
              <FormGroup>
                <FormikField
                  name="username"
                  type="text"
                  label="Nom d'utilisateur"
                  required={true}
                />
              </FormGroup>
              <FormGroup>
                <FormikField name="email" type="email" label="Email" required={true} />
              </FormGroup>
              <FormGroup>
                <FormikField name="password" type="password" label="Mot de passe" required={true} />
                <FormikField
                  name="confirmPassword"
                  type="password"
                  label="Confirmez votre mot de passe"
                  required={true}
                />
              </FormGroup>
            </form>
          )}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-between px-2 py-1">
          <button
            className="py-1.5 px-5 rounded-lg bg-blue-600 hover:bg-red-600 text-white shadow hover:shadow-md transition duration-100 ease-in-out"
            onClick={handleClose}
          >
            Annuler
          </button>
          <button
            className="py-1.5 px-5 rounded-lg bg-blue-600 hover:bg-green-500 text-white shadow hover:shadow-md transition duration-100 ease-in-out"
            onClick={(event) => {
              event && event.preventDefault();
              if (formRef) formRef.current.handleSubmit();
            }}
            type="submit"
          >
            Valider
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default RegisterModal;
