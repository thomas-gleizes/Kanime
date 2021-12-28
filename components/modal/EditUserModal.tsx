import React from 'react';

import { useUserContext } from '@context/user';
import { useToggle } from '@hooks';
import Modal, { ModalBody } from '@layouts/Modal';

const EditUserModal: React.FunctionComponent = () => {
  const { user } = useUserContext();

  const [isOpen, toggleModal] = useToggle(false);

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
        close={toggleModal}
        className="mx-auto my-auto max-w-1000 rounded-md max-w-20 w-full mt-28 bg-white"
      >
        <ModalBody>{user.login}</ModalBody>
      </Modal>
    </>
  );
};

export default EditUserModal;
