import React from 'react';
import { Formik } from 'formik';

import { useUserContext } from '../../context/user';
import { useToggle } from '../../hooks';
import Modal, { ModalBody, ModalFooter } from '../layouts/Modal';
import Field, { TextArea } from '../common/field';
import Button from '../common/Button';

const EditUserModal: React.FunctionComponent = () => {
  const { user } = useUserContext();

  const [isOpen, toggleModal] = useToggle();

  if (!user) return null;

  const initialValues = {
    city: user.city,
    birthday: user.birthday,
    bio: user.bio,
    avatarPath: user.avatarPath,
    backgroundPath: user.backgroundPath,
    gender: user.gender,
  };

  const handleSubmit = (values) => {
    console.log('Values', values);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-6 py-1.5 rounded-md cursor-pointer text-white bg-secondary hover:bg-primary"
      >
        Modifier
      </button>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="mx-auto my-auto max-w-1000 rounded-md max-w-20 w-full mt-28 bg-white"
      >
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
              <>
                <div
                  onClick={() => {}}
                  className="relative w-full h-400 rounded-t-md bg-center bg-no-repeat bg-auto bg-center bg-clip-content flex"
                  style={{ background: `url('${user.backgroundPath}')` }}
                />

                <ModalBody className="p-8">
                  <div className="flex">
                    <Field type="text" name="city" label="Ville" />
                  </div>
                  <div className="flex">
                    <Field type="date" name="birthday" label="Date de naissance" />
                    <Field name="gender" label="Genre" />
                  </div>
                  <div>
                    <TextArea type="textarea" name="bio" label="Bio" />
                  </div>
                </ModalBody>
                <ModalFooter className="flex justify-between bg-gray-200 py-3 px-4 rounded-b">
                  <Button color="secondary" onClick={toggleModal}>
                    Annuler
                  </Button>
                  <Button color="primary" type="submit">
                    Enregistrer
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default EditUserModal;
