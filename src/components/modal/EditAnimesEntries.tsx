import React from 'react';
import { EntryStatus } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';

import Modal, { ModalBody, ModalHeader, ModalTitle } from 'components/layouts/modal';
import { Field, Select } from 'components/common/formik';

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

const EditAnimesEntries: Component<Props> = ({ isOpen, toggle, anime, animeUser }) => {
  const initialValues: values = {
    status: animeUser?.status || null,
    progress: 0,
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xs">
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

const FormContent: Component<FormikProps<values>> = ({
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
        <Field type="number" name="progress" label="Progression" />
      </div>
    </Form>
  );
};

export default EditAnimesEntries;
