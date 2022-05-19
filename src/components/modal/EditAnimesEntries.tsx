import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { EntryStatus } from '@prisma/client';
import { Dialog } from '@headlessui/react';

import type { PrismaEntryStatus } from 'prisma/app';
import Modal from 'components/layouts/Modal';
import { Select } from 'components/common/inputs';

interface Props {
  anime: Anime;
  animeUser?: Entry;
  isOpen: boolean;
  toggle: () => void;
}

type values = {
  status: PrismaEntryStatus | null;
  progress: number;
};

const status = Object.values(EntryStatus);

const EditAnimesEntries: Component<Props> = ({ isOpen, toggle, anime, animeUser }) => {
  const initialValues: values = {
    status: animeUser?.status || status[0],
    progress: 0,
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} externalToggleDisabled={false}>
      <Dialog.Title>
        <h3 className="text-xl font-bold">{anime.canonicalTitle}</h3>
      </Dialog.Title>
      <Dialog.Description className="h-500">
        <Formik initialValues={initialValues} onSubmit={console.log}>
          {(props) => <FormContent {...props} />}
        </Formik>
      </Dialog.Description>
    </Modal>
  );
};

const FormContent: Component<FormikProps<values>> = ({ values, setFieldValue }) => {
  return (
    <Form className="py-16">
      <div className="w-full">
        <Select
          value={values.status}
          onChange={(value) => setFieldValue('status', value)}
          color="red"
        >
          {status.map((option, index) => (
            <Select.Option key={index} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div></div>
    </Form>
  );
};

export default EditAnimesEntries;
