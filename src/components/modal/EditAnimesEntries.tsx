import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { EntryStatus } from '@prisma/client';
import { Dialog } from '@headlessui/react';

import type { PrismaEntryStatus } from 'prisma/app';
import { Select } from 'components/common/inputs';
import { replaceCamelCaseWithSpace } from 'utils/stringHelpers';
import Button from 'components/common/Button';

interface Props extends ModalProps {
  anime: Anime;
  entry?: Entry;
  isOpen: boolean;
}

type values = {
  status: PrismaEntryStatus | null;
  progress: number;
};

const status = Object.entries(EntryStatus).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value: value,
}));

const EditAnimesEntries: Component<Props> = ({ close, anime, entry }) => {
  const initialValues: values = {
    status: entry?.status || EntryStatus.Wanted,
    progress: 0,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(props) => (
        <Form>
          <FormContent {...props} anime={anime} />
        </Form>
      )}
    </Formik>
  );
};

const FormContent: Component<FormikProps<values> & { anime: Anime }> = ({
  values,
  setFieldValue,
  anime,
}) => {
  return (
    <>
      <Dialog.Title className="border-b pb-5">
        <h3 className="text-xl font-bold">{anime.canonicalTitle}</h3>
      </Dialog.Title>
      <Dialog.Description className="h-500">
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
        </div>
        <div className="flex"></div>
      </Dialog.Description>
      <Dialog.Description className="border-t">
        <Button type="button">Cancel</Button>
        <Button type="submit">Valider</Button>
      </Dialog.Description>
    </>
  );
};

export default EditAnimesEntries;
