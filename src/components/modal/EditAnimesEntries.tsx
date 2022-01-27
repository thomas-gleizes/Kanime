import React from 'react';
import { EntryStatus } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';

import { Anime, Entry } from '@types';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '@layouts/modal';
import Select from '@components/common/formik/Select';

interface Props {
  anime: Anime;
  animeUser?: Entry;
  isOpen: boolean;
  toggle: () => void;
}

type values = {
  status: EntryStatus | null;
  progress: number;
};

const EditAnimesEntries: React.FunctionComponent<Props> = ({
  isOpen,
  toggle,
  anime,
  animeUser,
}) => {
  const initialValues: values = {
    status: animeUser?.status || null,
    progress: 0,
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="m-auto rounded-md max-w-700 w-full mt-28 bg-white"
    >
      <ModalHeader>
        <ModalTitle>{anime.canonicalTitle}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Formik initialValues={initialValues} onSubmit={console.log}>
          {(props) => <FormContent {...props} />}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

const FormContent: React.FunctionComponent<FormikProps<values>> = ({
  values,
  handleChange,
  handleBlur,
}) => {
  return (
    <Form className="p-3">
      <div className="mb-1">
        <Select name="status" label="Status">
          {Object.values(EntryStatus).map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label>Avancement</label>
        <input
          type="number"
          name="progress"
          value={values.progress}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </Form>
  );
};

export default EditAnimesEntries;
