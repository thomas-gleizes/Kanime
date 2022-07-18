import React, { useEffect, useMemo } from 'react';

import { useDialogContext } from 'context/dialog.context';
import { dialogTypes } from 'resources/constants';
import Modal from 'components/layouts/Modal';
import Button from 'components/common/Button';
import { Dialog } from '@headlessui/react';

const AlertDialog: Component = () => {
  const {
    dialogs: [dialog],
    resetDialogs,
  } = useDialogContext();

  const isOpen = useMemo<boolean>(() => dialog.type === dialogTypes.alert, [dialog.type]);

  useEffect(() => {
    if (isOpen) {
      const listener = (event) => {
        if (event.which === 27 || event.which === 13) handleClose();
      };

      document.addEventListener('keydown', listener);

      return () => {
        document.removeEventListener('keydown', listener);
      };
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    dialog.resolve(null);
    resetDialogs();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleClose}>
      <Dialog.Title>
        <h3 className="text-xl font-bold px-3">Attention</h3>
      </Dialog.Title>
      <Dialog.Description>
        <div className="my-8">
          <p className="text-center">{dialog.content}</p>
        </div>
        <div className="flex justify-end">
          <Button color="blue" onClick={handleClose}>
            Ok
          </Button>
        </div>
      </Dialog.Description>
    </Modal>
  );
};

export default AlertDialog;
