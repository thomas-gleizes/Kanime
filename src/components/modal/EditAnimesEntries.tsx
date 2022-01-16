import React from 'react';
import { Form, Formik } from 'formik';

import { Anime, AnimeUser } from '@types';
import { useToggle } from '@hooks';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '@layouts/modal';
import { EditButton } from '@layouts/buttons';
import Field from '@components/common/formik';
import { InputNumber, InputRange } from '@components/common/inputs';

interface Props {
  anime: Anime;
  animeUser?: AnimeUser;
}

const EditAnimesEntries: React.FunctionComponent<Props> = ({ anime, animeUser }) => {
  const [isOpen, toggleModal] = useToggle(false);

  const initialValues = {
    status: animeUser?.status || null,
    progress: 0,
  };

  return (
    <>
      <EditButton onClick={toggleModal} />
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="m-auto rounded-md max-w-700 w-full mt-28 bg-white"
      >
        <ModalHeader>
          <ModalTitle>{anime.canonicalTitle}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Formik initialValues={initialValues} onSubmit={console.log}>
            {({ values, setFieldValue }) => <Form></Form>}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditAnimesEntries;
