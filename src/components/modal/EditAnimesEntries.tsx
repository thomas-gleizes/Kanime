import React, { useEffect, useMemo } from 'react';
import { Form, Formik, FormikProps, Field } from 'formik';
import { EntryStatus, Visibility } from '@prisma/client';
import { FaSave, FaStar, FaTrash } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import dayjs from 'dayjs';
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
  SliderMark,
} from '@chakra-ui/react';

import { replaceCamelCaseWithSpace } from 'utils/stringHelpers';
import { editEntrySchema } from 'resources/validations';
import { useUserContext } from 'context/user.context';
import { Select } from 'components/common/inputs';

interface Props extends ModalProps {
  anime: Anime;
  entry?: Entry;
  isOpen: boolean;
}

const status = Object.entries(EntryStatus).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value: value,
}));

const visibilities = Object.entries(Visibility).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value,
}));

const EditAnimesEntries: Component<Props> = ({ close, anime, entry }) => {
  const { user } = useUserContext();

  const initialValues = useMemo<upsertEntries>(
    () => ({
      animeId: anime.id,
      userId: user.id,
      status: entry?.status || EntryStatus.Wanted,
      progress: entry?.progress || 0,
      visibility: entry?.visibility || 'public',
      rating: entry?.rating || null,
      note: entry?.note || null,
      startedAt: entry?.startedAt
        ? dayjs(entry.startedAt).format('YYYY-MM-DD')
        : undefined,
      finishAt: entry?.finishAt ? dayjs(entry.finishAt).format('YYYY-MM-DD') : undefined,
    }),
    [entry]
  );

  const handleSubmit = (values: upsertEntries) => {
    close({ action: 'submit', values });
  };

  const handleDelete = () => {
    if (entry) close({ action: 'delete' });
    else close(null);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={editEntrySchema(anime.episode.count || Infinity)}
    >
      {(props) => (
        <Form>
          <FormContent {...props} anime={anime} handleDelete={handleDelete} />
        </Form>
      )}
    </Formik>
  );
};

const FormContent: Component<
  FormikProps<upsertEntries> & { anime: Anime; handleDelete: () => void }
> = ({ values, setFieldValue, errors, anime, handleDelete }) => {
  const sliderColor = useMemo<string>(() => {
    if (values.rating >= 7.5) return 'yellow';
    else if (values.rating >= 5) return 'orange';
    else return 'red';
  }, [values.rating]);

  console.log('Errors', errors);

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
              {visibilities.map((option, index) => (
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
                <InputRightAddon>
                  {anime.episode.count ? `sur ${anime.episode.count} épisodes` : '-'}
                </InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <FormControl className="px-1 pt-6">
          <Slider
            aria-label="slider-ex-4"
            onChange={(value) => setFieldValue('rating', value)}
            value={values.rating}
            step={0.1}
            max={10}
          >
            <SliderMark
              value={values.rating}
              textAlign="center"
              bg="white"
              color={`${sliderColor}.400`}
              mt="-10"
              ml="-5"
              w="12"
            >
              {values.rating}
            </SliderMark>
            <SliderTrack bg={`${sliderColor}.100`}>
              <SliderFilledTrack bg={`${sliderColor}.300`} />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color={`${sliderColor}.400`} as={FaStar} />
            </SliderThumb>
          </Slider>
        </FormControl>
        <Field name="note">
          {({ field, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error}>
              <FormLabel>Commentaire</FormLabel>
              <Textarea
                {...field}
                resize="vertical"
                placeholder="Ajouter un commentaire"
                size="sm"
              />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="startedAt">
          {({ field, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error}>
              <FormLabel>Commencé le</FormLabel>
              <Input type="date" min={anime.dateBegin} max={values.finishAt} {...field} />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="finishAt">
          {({ field, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error}>
              <FormLabel>Fini le</FormLabel>
              <Input
                type="date"
                min={values.startedAt}
                max={dayjs().format('YYYY-MM-DD')}
                {...field}
              />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
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
