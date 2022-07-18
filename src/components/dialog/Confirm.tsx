import React, { useEffect, useMemo } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
} from '@chakra-ui/react';

import { useDialogContext } from 'context/dialog.context';
import { dialogTypes } from 'resources/constants';

const ConfirmDialog: Component = () => {
  const {
    dialogs: [dialog],
    resetDialogs,
  } = useDialogContext();

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
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = (result: boolean) => {
    dialog.resolve(result);
    resetDialogs();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleClose(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h3 className="text-xl font-bold px-3">Veuillez confirmer !</h3>
        </ModalHeader>
        <ModalBody>
          <div className="my-8">
            <p className="text-center">{dialog.content}</p>
          </div>
          <div className="w-full flex justify-between space-x-5">
            <Button color="blue.500" variant="outline" onClick={() => handleClose(false)}>
              Annuler
            </Button>
            <Button colorScheme="blue" color="white" onClick={() => handleClose(true)}>
              Confirmer
            </Button>
            {/*<Button color="sky" onClick={() => handleClose(false)}>*/}
            {/*  Annuler*/}
            {/*</Button>*/}
            {/*<Button color="emerald" onClick={() => handleClose(true)}>*/}
            {/*  Confirmer*/}
            {/*</Button>*/}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
