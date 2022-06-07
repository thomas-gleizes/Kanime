import React, { useEffect } from 'react';
import { Form, Formik, FormikProps, Field } from 'formik';
import { EntryStatus, Visibility } from '@prisma/client';
import { Dialog } from '@headlessui/react';
import { FaSave, FaStar, FaTrash } from 'react-icons/fa';
import {
  IconButton,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';

import type { PrismaEntryStatus, PrismaVisibility } from 'prisma/app';
import { Select } from 'components/common/inputs';
import { replaceCamelCaseWithSpace } from 'utils/stringHelpers';
import { editEntrySchema } from 'resources/validations';

interface Props extends ModalProps {
  anime: Anime;
  entry?: Entry;
  isOpen: boolean;
}

interface Values {
  status: PrismaEntryStatus | null;
  progress: number;
  visibility: PrismaVisibility | null;
  rating: number;
  note: string;
}

const status = Object.entries(EntryStatus).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value: value,
}));

const visibilies = Object.entries(Visibility).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value,
}));

const EditAnimesEntries: Component<Props> = ({ close, anime, entry }) => {
  const initialValues: Values = {
    status: entry?.status || EntryStatus.Wanted,
    progress: entry?.progress || 0,
    visibility: entry?.visibility || 'public',
    rating: entry?.rating || null,
    note: entry?.note || '',
  };

  const handleSubmit = (values: Values) => {
    close({ action: 'submit', values });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={editEntrySchema(anime.episode.count)}
    >
      {(props) => (
        <Form>
          <FormContent {...props} anime={anime} close={close} />
        </Form>
      )}
    </Formik>
  );
};

const FormContent: Component<FormikProps<Values> & { anime: Anime; close: Function }> = ({
  values,
  setFieldValue,
  handleChange,
  errors,
  touched,
  anime,
  close,
}) => {
  const handleDelete = () => {
    close({ action: 'delete' });
  };

  return (
    <>
      <Dialog.Title className="border-b pb-5">
        <h3 className="text-xl font-bold">{anime.canonicalTitle}</h3>
      </Dialog.Title>
      <Dialog.Description className="py-5 flex flex-col space-y-4">
        <div className="w-full flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <FormControl className="w-full">
            <FormLabel>Statut</FormLabel>
            <Select
              value={values.status}
              onChange={(value) => setFieldValue('status', value)}
              color="blue"
            >
              {status.map((option, index) => (
                <Select.Option color="blue" key={index} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full">
            <FormLabel>Visibilité</FormLabel>
            <Select
              value={values.visibility}
              onChange={(value) => setFieldValue('visibility', value)}
              color="blue"
            >
              {visibilies.map((option, index) => (
                <Select.Option color="blue" key={index} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </FormControl>
        </div>
        <Field name="progress">
          {({ field, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error}>
              <FormLabel htmlFor="progress">Progression</FormLabel>
              <InputGroup>
                <Input
                  {...field}
                  id="progress"
                  type="number"
                  min={0}
                  max={anime.episode.count}
                />
                <InputRightAddon>sur {anime.episode.count} épisodes</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <FormControl className="px-1">
          <Slider
            onChange={console.log}
            aria-label="rating"
            colorScheme="yellow.600"
            defaultValue={10}
            step={0.1}
            max={10}
          >
            <SliderTrack>
              <SliderFilledTrack bgSize="xl" />
            </SliderTrack>
            <SliderThumb>
              <Box color="yellow.400" as={FaStar} />
            </SliderThumb>
          </Slider>
        </FormControl>
        <Field name="note">
          {({ field, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error}>
              <FormLabel>Note</FormLabel>
              <Textarea
                {...field}
                resize="vertical"
                placeholder="Ajouter un commentaire"
                size="sm"
              />
            </FormControl>
          )}
        </Field>
      </Dialog.Description>
      <Dialog.Description className="border-t pt-4 flex justify-between">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="close dialog"
          icon={<FaTrash />}
          onClick={handleDelete}
        />
        <Button type="submit" leftIcon={<FaSave />} colorScheme="teal" variant="solid">
          Enregistré
        </Button>
      </Dialog.Description>
    </>
  );
};

export default EditAnimesEntries;
