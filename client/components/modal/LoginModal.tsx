import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";

import { UserApi } from "../../api";
import { useUserContextAction } from "../../context/user";
import addToast, { TOAST_ERROR } from "../../helpers/toastr";
import { FormGroup, FormikField } from "../common/Form";
import Modal, { ModalTitle, ModalBody, ModalFooter, ModalHeader } from "../layouts/Modal";

const LoginModal = ({ openModal, handleClose }) => {
  const formRef = useRef(null);
  const { logUser } = useUserContextAction();

  const initialValues = {
    username: "Kalat",
    password: "azerty123",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Veuillez indiquez un nom d'utilisateur."),
    password: Yup.string().required("Veuillez indiquez un mot de passe."),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await UserApi.login(values);
      logUser(data);
      handleClose && handleClose();
    } catch (error) {
      addToast(error.message || "Une erreur est survenue.", TOAST_ERROR);
    }
  };

  return (
    <Modal
      className="mx-auto my-auto max-w-500 rounded-sm mt-28 bg-white border-2 border-gray-200"
      isOpen={openModal}
      close={handleClose}
    >
      <ModalHeader>
        <div className="flex justify-between">
          <ModalTitle> Connexion </ModalTitle>
          <button
            onClick={handleClose}
            className="border-2 border-red-600 p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition duration-100 ease-in-out"
          >
            <FaTimes size="15px" />
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
                <FormikField name="password" type="password" label="Mot de passe" required={true} />
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
            type="submit"
            className="py-1.5 px-5 rounded-lg bg-blue-600 hover:bg-green-500 text-white shadow hover:shadow-md transition duration-100 ease-in-out"
            onClick={(event) => {
              event && event.preventDefault();
              if (formRef) formRef.current.handleSubmit();
            }}
          >
            Valider
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
