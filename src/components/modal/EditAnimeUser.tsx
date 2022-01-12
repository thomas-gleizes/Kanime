import React from 'react';
import { Formik } from 'formik';

import { Anime, AnimeUser } from '@types';
import { useToggle } from '@hooks';
import Modal from '@layouts/modal';
import { EditButton } from '@layouts/buttons';
import Field from '@components/common/formik';
import { InputNumber } from '@components/common/inputs';

interface Props {
  anime: Anime;
  animeUser?: AnimeUser;
}

const EditAnimeUser: React.FunctionComponent<Props> = ({ anime, animeUser }) => {
  const [isOpen, toggleModal] = useToggle(false);

  const initialValues = {
    status: animeUser?.status || null,
    progress: 0,
  };

  return (
    <>
      <EditButton onClick={toggleModal} />

      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="mx-auto my-auto max-w-1000 rounded-md max-w-20 w-full p-4 mt-28 bg-white"
      >
        <Formik initialValues={initialValues} onSubmit={console.log}>
          {({ values, setFieldValue }) => (
            <>
              <InputNumber
                step={1}
                min={0}
                max={anime.episode.count}
                value={values.progress}
                onChange={(value) => setFieldValue('progress', value)}
              />
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditAnimeUser;
