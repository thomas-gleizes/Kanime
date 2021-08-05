import { useRef } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { FaCamera } from "react-icons/fa";

import { UserApi } from "../../api";
import { img, users } from "../../ressources/routes";
import { useUserContext, useUserContextAction } from "../../context/user";
import { decodeTo64 } from "../../helpers/function";
import { useLogin } from "../../helpers/hooks";
import addToast, { TOAST_ERROR } from "../../helpers/toastr";
import Modal, { ModalBody, ModalFooter } from "../layouts/Modal";
import FormikField from "../common/Form/FormikField";
import FormikSelect from "../common/Form/FormikSelect";
import FormGroup from "../common/Form/FormGroup";
import Button from "../common/Form/Button";
import { FormikFile } from "../common/Form";

const EditUserModal = ({ modalOpen, handleClose }) => {
  useLogin();
  const router = useRouter();

  const formRef = useRef<any>();
  const avatarRef = useRef<HTMLInputElement>();
  const backgroundRef = useRef<HTMLInputElement>();
  const { user } = useUserContext();
  const { updateUser } = useUserContextAction();

  const initialValues = {
    city: user.city || null,
    birthday: user.birthday || null,
    gender: user.gender || null,
    bio: user.bio || null,
    media: {
      avatar: null,
      background: null,
    },
  };

  const handleSubmit = async (values) => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      try {
        const { data } = await UserApi.edit(values);
        updateUser(data.user);

        handleClose && handleClose();
      } catch (error) {
        addToast(error.message || "une erreur est survenue", TOAST_ERROR);
      }
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      close={handleClose}
      className="mx-auto my-auto max-w-1000 rounded-md max-w-20 w-full mt-28 bg-white"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              className="relative w-full rounded-t-md bg-center bg-no-repeat bg-cover bg-clip-padding flex"
              style={{
                backgroundImage: `url('${
                  values.media.background
                    ? decodeTo64(values.media.background)
                    : user.media?.background
                    ? process.env.NEXT_PUBLIC_API + user.media.background
                    : img.default.background
                }')`,
                height: "200px",
              }}
            >
              <div
                className="w-10/12 relative my-auto opacity-80 hover:opacity-100 cursor-pointer"
                onClick={() => backgroundRef.current.click()}
              >
                <FaCamera size={40} className="mx-auto" />
                <p className="text-center">Changer la bannière</p>
                <FormikFile innerRef={backgroundRef} name="media[background]" />
              </div>

              <div
                className="absolute w-1/4 my-auto right-1 top-6 cursor-pointer rounded-full"
                onClick={() => avatarRef.current.click()}
              >
                <img
                  src={
                    values.media.avatar
                      ? decodeTo64(values.media.avatar)
                      : user.media.avatar
                      ? process.env.NEXT_PUBLIC_API + user.media.avatar
                      : img.default.avatar
                  }
                  className="rounded-full opacity-90 hover:opacity-100 hover:shadow-2xl"
                  alt="input avatar"
                  width={150}
                  height={150}
                />
              </div>
              <FormikFile innerRef={avatarRef} name="media[avatar]" />
            </div>
            <ModalBody>
              <FormGroup>
                <FormikField
                  name="city"
                  type="text"
                  label="Ville"
                  list="city-list"
                />
                <datalist id="city-list">
                  <option value="Montpellier">Montpellier</option>
                  <option value="Fabrègues"> Fabrègues </option>
                </datalist>

                <FormikField name="birthday" type="date" label="Anniversaire" />
              </FormGroup>
              <FormGroup>
                <FormikSelect name="gender" label="Genre">
                  <option value="secret">Secret</option>
                  <option value="femme">Femme</option>
                  <option value="homme">Homme</option>
                  <option value="autre">Autre</option>
                </FormikSelect>
              </FormGroup>
              <FormGroup>
                <FormikField type="text" name="bio" label="Bio" />
              </FormGroup>
            </ModalBody>
            <ModalFooter className="flex justify-between p-1">
              <Button
                type="button"
                onClick={() =>
                  router.push(`${users.index}/${user?.username}/settings`)
                }
              >
                Settings
              </Button>
              <Button
                type="submit"
                onClick={(event) => {
                  event && event.preventDefault();
                  if (formRef) formRef.current.handleSubmit();
                }}
              >
                Mettre à jour
              </Button>
            </ModalFooter>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditUserModal;
