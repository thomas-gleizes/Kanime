import React, { useState } from 'react';

import { useLayoutContext } from '@context/layout';
import { dialogTypes } from '@lib/constants';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '@layouts/modal';
import Button from '@components/common/Button';

const PromptDialog: React.FunctionComponent = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const [value, setValue] = useState<string>('');

  const handleClose = (value) => {
    dialog.resolve(value);
    setDialog({ type: null, text: '', resolve: null });
    setValue('');
  };

  return (
    <Modal
      isOpen={dialog.type === dialogTypes.prompt}
      toggle={() => handleClose(false)}
      className="max-w-500 mx-auto my-auto h-auto bg-white"
    >
      <ModalHeader>{dialog.text}</ModalHeader>
      <ModalBody>
        <input
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="blue" onClick={() => handleClose(false)}>
          Annuler
        </Button>
        <Button color="green" onClick={() => handleClose(value)}>
          Confirmer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PromptDialog;
