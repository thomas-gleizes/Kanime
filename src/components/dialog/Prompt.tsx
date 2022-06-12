import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';
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
    setDialog({ type: null, content: '', resolve: null });
    setValue('');
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleClose(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h3 className="text-xl font-bold px-3">Attention</h3>
        </ModalHeader>
        <ModalBody>
          <div className="my-8">
            <label>{dialog.content}</label>
            <Input
              type="text"
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-between space-x-5">
            <Button color="sky" onClick={() => handleClose(false)}>
              Annuler
            </Button>
            <Button color="emerald" onClick={() => handleClose(value)}>
              Confirmer
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PromptDialog;
