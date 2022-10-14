import React, { useMemo } from 'react';
import { Field, FieldAttributes, Form, Formik, FormikProps } from 'formik';
import deepEqual from 'deep-equal';
import { EntryStatus, Visibility } from '@prisma/client';
import { FaSave, FaStar, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Textarea,
} from '@chakra-ui/react';

import { ApiService } from 'services/api.service';
import { replaceCamelCaseWithSpace } from 'utils/stringHelpers';
import { editEntrySchema } from 'resources/validations';
import { CreateEntryDto } from 'dto';
import { ApiException } from 'exceptions';
import { Select } from 'components/common/inputs';

type SubmitResult = {
  action: 'submit';
  values: Entry;
};

type DeleteSubmit = {
  action: 'delete';
};

type CancelSubmit = { action: 'cancel' };

export type Result = DeleteSubmit | SubmitResult | CancelSubmit;

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
  const initialValues = useMemo<CreateEntryDto>(
    () => ({
      animeId: anime.id,
      status: entry?.status || EntryStatus.Wanted,
      progress: entry?.progress || 0,
      visibility: entry?.visibility || Visibility.public,
      rating: entry?.rating,
      note: entry?.note,
      startedAt: entry?.startedAt
        ? dayjs(entry.startedAt).format('YYYY-MM-DD')
        : undefined,
      finishAt: entry?.finishAt ? dayjs(entry.finishAt).format('YYYY-MM-DD') : undefined,
    }),
    [entry]
  );

  const handleSubmit = async (values: CreateEntryDto) => {
    try {
      const response = await ApiService.post<{ entry: Entry }>(
        `/animes/${anime.id}/entries`,
        values
      );

      // @ts-ignore
      close({ action: 'submit', values: { ...response.entry, anime } });
    } catch (err) {
      if (err instanceof ApiException) toast.error(err.message);
      else toast.error('Une erreur est survenue');
    }
  };

  const handleDelete = async () => {
    if (!entry) return close({ action: 'cancel' });

    try {
      await ApiService.delete(`/animes/${entry.animeId}/entries`);

      return close({ action: 'delete' });
    } catch (err) {
      if (err instanceof ApiException) toast.error(err.message);
      else toast.error('Une erreur est survenue');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => close({ action: 'cancel' })}
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
            <FormContent
              {...props}
              anime={anime}
              handleDelete={handleDelete}
              handleClose={() => close({ action: 'cancel' })}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const FormContent: Component<
  FormikProps<CreateEntryDto> & {
    anime: Anime;
    handleDelete: () => void;
    handleClose: () => void;
  }
> = ({
  values,
  setFieldValue,
  anime,
  handleDelete,
  initialValues,
  isSubmitting,
  handleClose,
}) => {
  const sliderColor = useMemo<string>(() => {
    if (!values.rating) return 'yellow';
    else if (values.rating >= 7.5) return 'green';
    else if (values.rating >= 5) return 'orange';
    else return 'red';
  }, [values.rating]);

  const Option = Select.Option;

  const isChanged = useMemo<boolean>(
    () => !deepEqual(initialValues, values),
    [values, initialValues]
  );

  return (
    <ModalContent className="px-4">
      <ModalHeader className="flex justify-between items-center border-b pb-5">
        <h3 className="text-xl font-bold">{anime.canonicalTitle}</h3>
        <IconButton
          size="sm"
          variant="outline"
          aria-label="close dialog"
          icon={<FaTimes />}
          onClick={handleClose}
          disabled={isSubmitting}
          colorScheme="orange"
        />
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
                  <Option key={index} color="blue" value={option.value}>
                    {option.label}
                  </Option>
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
                  <Option color="blue" key={index} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </FormControl>
          </div>
          <Field name="progress">
            {({ field, meta }: FieldAttributes<any>) => (
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
              value={values.rating || 0}
              step={0.1}
              max={10}
            >
              <SliderMark
                value={values.rating || 0}
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
            {({ field, meta }: FieldAttributes<any>) => (
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
            {({ field, meta }: FieldAttributes<any>) => (
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
            {({ field, meta }: FieldAttributes<any>) => (
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
              colorScheme="black"
              aria-label="close dialog"
              icon={<FaTrash />}
              onClick={handleDelete}
              disabled={isSubmitting}
            />
          </div>
          <Button
            className="w-fit"
            type="submit"
            leftIcon={<FaSave />}
            colorScheme="blue"
            variant="solid"
            disabled={!isChanged || isSubmitting}
          >
            Enregistré
          </Button>
        </div>
      </ModalFooter>
    </ModalContent>
  );
};

export default EditAnimesEntries;
