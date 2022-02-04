import React, { useEffect, useMemo } from 'react';

import { useLayoutContext } from '@context/layout.context';
import { dialogTypes } from '@lib/constants';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '@layouts/modal';
import Button from '@components/common/Button';

const AlertDialog: React.FunctionComponent = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

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
  }, [isOpen]);

  const handleClose = () => {
    dialog.resolve(null);
    setDialog({ type: null, text: '', resolve: null });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleClose}
      className="max-w-500 mx-auto my-auto h-auto bg-white"
    >
      <ModalHeader>
        <h3 className="text-lg px-3">Attention</h3>
      </ModalHeader>
      <ModalBody>{dialog.text}</ModalBody>
      <ModalFooter>
        <div className="flex justify-between">
          <Button color="blue" onClick={handleClose}>
            Ok
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AlertDialog;
