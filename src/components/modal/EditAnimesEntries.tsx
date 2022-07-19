import React, { useMemo } from 'react';
import { Form, Formik, FormikProps, Field } from 'formik';
import deepEqual from 'deep-equal';
import { EntryStatus, Visibility } from '@prisma/client';
import { FaSave, FaStar, FaTrash } from 'react-icons/fa';
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
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { replaceCamelCaseWithSpace } from 'utils/stringHelpers';
import { editEntrySchema } from 'resources/validations';
import { useUserContext } from 'context/user.context';
import { Select } from 'components/common/inputs';

type SubmitResult = {
  action: 'submit';
  values: upsertEntries;
};

type DeleteSubmit = {
  action: 'delete';
};

export type Result = DeleteSubmit | SubmitResult | null;

export interface Props {
  anime: Anime;
  entry?: Entry;
}

const status = Object.entries(EntryStatus).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value: value,
}));

const visibilities = Object.entries(Visibility).map(([key, value]) => ({
  label: replaceCamelCaseWithSpace(key),
  value,
}));

const EditAnimesEntries: DialogComponent<Props, Result> = ({
  isOpen,
  close,
  anime,
  entry,
}) => {
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
    <Modal
      isOpen={isOpen}
      onClose={() => close(null)}
      motionPreset="slideInBottom"
      isCentered
      size="lg"
    >
      <ModalOverlay />
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
    </Modal>
  );
};

const FormContent: Component<
  FormikProps<upsertEntries> & { anime: Anime; handleDelete: () => void }
> = ({ values, setFieldValue, anime, handleDelete, initialValues }) => {
  const sliderColor = useMemo<string>(() => {
    if (values) return 'yellow';
    else if (values.rating >= 7.5) return 'yellow';
    else if (values.rating >= 5) return 'orange';
    else return 'red';
  }, [values.rating]);

  const isChanged = useMemo<boolean>(
    () => !deepEqual(initialValues, values),
    [values, initialValues]
  );

  return (
    <ModalContent className="px-4">
      <ModalHeader className="border-b pb-5">
        <h3 className="text-xl font-bold">{anime.canonicalTitle}</h3>
      </ModalHeader>
      <ModalBody>
        <div className="py-4 flex flex-col space-y-4">
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
                <Input
                  type="date"
                  min={anime.dateBegin}
                  max={values.finishAt}
                  {...field}
                />
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
        </div>
      </ModalBody>
      <ModalFooter className="border-t">
        <div className="w-full flex justify-between">
          <div>
            <IconButton
              className="w-fit"
              variant="outline"
              colorScheme="teal"
              aria-label="close dialog"
              icon={<FaTrash />}
              onClick={handleDelete}
            />
          </div>
          <Button
            className="w-fit"
            type="submit"
            leftIcon={<FaSave />}
            colorScheme="teal"
            variant="solid"
            disabled={!isChanged}
          >
            Enregistré
          </Button>
        </div>
      </ModalFooter>
    </ModalContent>
  );
};

export default EditAnimesEntries;
