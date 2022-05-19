import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { EntryStatus } from '@prisma/client';
import { Dialog } from '@headlessui/react';

import type { PrismaEntryStatus } from 'prisma/app';
import Modal from 'components/layouts/Modal';
import { Select } from 'components/common/inputs';
import { replaceCamelCaseWithSpace } from 'utils/stringHelpers';

import { InputNumber } from 'primereact/inputnumber';

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

const status = Object.entries(EntryStatus).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value: value,
}));

const EditAnimesEntries: Component<Props> = ({ isOpen, toggle, anime, animeUser }) => {
  const initialValues: values = {
    status: animeUser?.status || EntryStatus.Wanted,
    progress: 0,
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Dialog.Title className="border-b pb-5">
        <h3 className="text-xl font-bold">{anime.canonicalTitle}</h3>
      </Dialog.Title>
      <Dialog.Description className="h-500">
        <Formik initialValues={initialValues} onSubmit={console.log}>
          {(props) => <FormContent {...props} anime={anime} />}
        </Formik>
      </Dialog.Description>
    </Modal>
  );
};

const FormContent: Component<FormikProps<values> & { anime: Anime }> = ({
  values,
  setFieldValue,
  anime,
}) => {
  console.log(anime);

  return (
    <Form>
      <div className="my-5">
        <div className="w-10/12">
          <label>Statut</label>
          <Select
            value={values.status}
            onChange={(value) => setFieldValue('status', value)}
            color="fuchsia"
          >
            {status.map((option, index) => (
              <Select.Option
                color={index % 2 === 0 ? 'blue' : 'fuchsia'}
                key={index}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="field col-12 md:col-3">
          <label htmlFor="horizontal">Horizontal with Step</label>
          <InputNumber
            value={values.progress}
            onValueChange={(e) => setFieldValue('progress', e.value)}
            showButtons
            buttonLayout="horizontal"
            step={1}
            decrementButtonClassName="p-button-blue"
            incrementButtonClassName="p-button-blue"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        </div>
      </div>
    </Form>
  );
};

export default EditAnimesEntries;
