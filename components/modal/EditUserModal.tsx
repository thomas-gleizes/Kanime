import React from 'react';
import { Formik } from 'formik';

import { useUserContext } from '@context/user';
import { useToggle } from '@hooks';
import Modal from '@layouts/Modal';
import Field from '@components/common/field';

const EditUserModal: React.FunctionComponent = () => {
  const { user } = useUserContext();

  const [isOpen, toggleModal] = useToggle();

  if (!user) return null;

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
          <Formik initialValues={{}} onSubmit={console.log}>
            <>
              <div
                onClick={() => {}}
                className="relative w-full h-400 rounded-t-md bg-center bg-no-repeat bg-cover bg-clip-content flex"
                style={{ background: `url('${user.backgroundPath}')` }}
              />
              <div>
                <Field name="test" />
              </div>
            </>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default EditUserModal;
