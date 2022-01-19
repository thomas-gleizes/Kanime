import React from 'react';

import { useLayoutContext } from '@context/layout';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '@layouts/modal';
import { dialogTypes } from '@lib/constants';
import Button from '@components/common/Button';

const ConfirmDialog: React.FunctionComponent = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const handleClose = (result: boolean) => {
    dialog.resolve(result);
    setDialog({ type: null, text: '', resolve: null });
  };

  return (
    <Modal
      isOpen={dialog.type === dialogTypes.confirm}
      toggle={() => handleClose(false)}
      className="max-w-500 mx-auto my-auto h-auto bg-white"
    >
      <ModalHeader>Veuillez confirmer</ModalHeader>
      <ModalBody>{dialog.text}</ModalBody>
      <ModalFooter>
        <Button color="blue" onClick={() => handleClose(false)}>
          Annuler
        </Button>
        <Button color="green" onClick={() => handleClose(true)}>
          Confirmer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDialog;
