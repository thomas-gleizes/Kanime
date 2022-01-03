import React from 'react';
import { Form, Formik } from 'formik';
import { Country } from '@prisma/client';

import appAxios from '@lib/api/appAxios';
import { useUserContext } from '@context/user';
import { useFetch, useToggle } from '@hooks';
import Modal, { ModalBody, ModalFooter } from '@layouts/Modal';
import Field, { Select, TextArea } from '@components/common/field';
import Button from '@components/common/Button';

const fetchCountry = () => appAxios.get<Country[]>('common/countries');

const GENDER = ['Secret', 'Male', 'Female'];

const EditUserModal: React.FunctionComponent = () => {
  const { user } = useUserContext();

  const [isOpen, toggleModal] = useToggle();

  const [{ countries }, loading] = useFetch(fetchCountry);

  if (!user) return null;

  const initialValues = {
    city: user.city,
    birthday: user.birthday,
    bio: user.bio,
    avatarPath: user.avatarPath,
    backgroundPath: user.backgroundPath,
    gender: user.gender,
  };

  const handleSubmit = async (values) => {
    console.log('Values', values);

    const response = await appAxios.patch(`users/${user.id}`, values);

    console.log('Response', response);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-6 py-1.5 rounded-md cursor-pointer text-white bg-secondary hover:bg-primary"
      >
        Modifier
      </button>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="mx-auto my-auto max-w-1000 rounded-md max-w-20 w-full mt-28 bg-white"
      >
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div
                onClick={() => {}}
                className="relative w-full h-400 rounded-t-md bg-center bg-no-repeat bg-auto bg-center bg-clip-content flex"
                style={{ background: `url('${user.backgroundPath}')` }}
              />

              <ModalBody className="p-8">
                <div className="flex">
                  <Select name="country" label="Pays">
                    <option value="">Secret</option>
                    {countries?.map((country: Country) => (
                      <option key={country.id} value={country.id}>
                        {country.iso} - {country.name}
                      </option>
                    ))}
                  </Select>
                  <Field type="text" name="city" label="Ville" />
                </div>
                <div className="flex">
                  <Field type="date" name="birthday" label="Date de naissance" />
                  <Select name="gender" label="Genre">
                    {GENDER.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <TextArea name="bio" label="Bio" />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between bg-gray-200 py-3 px-4 rounded-b">
                <Button color="secondary" onClick={toggleModal}>
                  Annuler
                </Button>
                <Button color="primary" type="submit">
                  Enregistrer
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default EditUserModal;
