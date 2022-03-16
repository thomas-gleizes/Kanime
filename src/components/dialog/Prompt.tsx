import React, { useEffect, useMemo, useState } from 'react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';
import Modal, { ModalBody, ModalFooter, ModalHeader } from 'components/layouts/modal';
import Button from 'components/common/Button';

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
    <Modal
      isOpen={isOpen}
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
