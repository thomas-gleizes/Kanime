import React, { useEffect, useMemo } from 'react';
import { Dialog } from '@headlessui/react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';
import Modal from 'components/layouts/Modal';
import Button from 'components/common/Button';

const ConfirmDialog: Component = () => {
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
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = (result: boolean) => {
    dialog.resolve(result);
    setDialog({ type: null, content: '', resolve: null });
  };

  return (
    <Modal isOpen={isOpen} toggle={() => handleClose(false)} externalToggleDisabled>
      <Dialog.Title>
        <h3 className="text-xl font-bold px-3">Veuillez confirmer !</h3>
      </Dialog.Title>
      <Dialog.Description>
        <div className="my-8">
          <p className="text-center">{dialog.content}</p>
        </div>
        <div className="w-full flex justify-between space-x-5">
          <Button color="sky" onClick={() => handleClose(false)}>
            Annuler
          </Button>
          <Button color="emerald" onClick={() => handleClose(true)}>
            Confirmer
          </Button>
        </div>
      </Dialog.Description>
    </Modal>
  );
};

export default ConfirmDialog;
