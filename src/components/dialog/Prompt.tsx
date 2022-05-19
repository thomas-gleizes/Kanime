import React, { useEffect, useMemo, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';
import Modal from 'components/layouts/Modal';
import Button from 'components/common/Button';
import { Input } from 'components/common/inputs';

const PromptDialog: Component = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const [value, setValue] = useState<string>('');

  const isOpen = useMemo<boolean>(
    () => dialog.type === dialogTypes.prompt,
    [dialog.type]
  );

  useEffect(() => {
    if (isOpen) {
      const listener = (event) => {
        if (event.which === 27) handleClose(false);
      };

      document.addEventListener('keydown', listener);

      return () => {
        document.removeEventListener('keydown', listener);
      };
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = (value: string | false) => {
    dialog.resolve(value);
    setDialog({ type: null, text: '', resolve: null });
    setValue('');
  };

  return (
    <Modal isOpen={isOpen} toggle={() => handleClose(false)} externalToggleDisabled>
      <Dialog.Title>
        <h3 className="text-xl font-bold px-3">Attention</h3>
      </Dialog.Title>
      <Dialog.Description>
        <div className="my-8">
          <label>{dialog.text}</label>
          <Input
            type="text"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <div className="w-full flex justify-between space-x-5">
          <Button color="sky" onClick={() => handleClose(false)}>
            Annuler
          </Button>
          <Button color="emerald" onClick={() => handleClose(value)}>
            Confirmer
          </Button>
        </div>
      </Dialog.Description>
    </Modal>
  );
};

export default PromptDialog;
