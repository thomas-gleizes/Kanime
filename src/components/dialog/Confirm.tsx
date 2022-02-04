import React, { useEffect, useMemo } from 'react';

import { useLayoutContext } from '@context/layout.context';
import { dialogTypes } from '@lib/constants';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '@layouts/modal';
import Button from '@components/common/Button';

const ConfirmDialog: React.FunctionComponent = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const isOpen = useMemo<boolean>(
    () => dialog.type === dialogTypes.confirm,
    [dialog.type]
  );

  useEffect(() => {
    if (isOpen) {
      const listener = (event) => {
        if (event.which === 27) handleClose(false);
        else if (event.which === 13) handleClose(true);
      };

      document.addEventListener('keydown', listener);

      return () => {
        document.removeEventListener('keydown', listener);
      };
    }
  }, [isOpen]);

  const handleClose = (result: boolean) => {
    dialog.resolve(result);
    setDialog({ type: null, text: '', resolve: null });
  };

  return (
    <Modal
      isOpen={isOpen}
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
