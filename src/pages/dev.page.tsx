import React from 'react';

import { Page } from 'app/next';

import { useDialog } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props1 {
  content: string;
}

type Result1 = { action: 'close'; value: number } | { action: 'cancel' };

interface Props2 {
  value: number;
}

type Result2 = { action: 'close' | 'cancel' };

const Modal1: DialogComponent<Props1, Result1> = ({ isOpen, close, content }) => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog<Props2, Result2>(Modal2, {
      value: Math.random() * 10,
    });

    if (result.action === 'close') {
      close({ action: 'close', value: Math.random() });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => close({ action: 'cancel' })}
      motionPreset="slideInBottom"
      isCentered
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h1>{content}</h1>
        </ModalHeader>
        <ModalBody>
          <Button onClick={handleClick}>Open other Modal</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Modal2: DialogComponent<Props2, Result2> = ({ isOpen, close, value }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => close({ action: 'cancel' })}
      motionPreset="slideInBottom"
      isCentered
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h1>{value}</h1>
        </ModalHeader>
        <ModalBody>
          <Button onClick={() => close({ action: 'cancel' })}>Close</Button>
          <Button onClick={() => close({ action: 'close' })}>Close all</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const DevPage: Page = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog<Props1, Result1>(Modal1, { content: 'ojk' });

    console.log('Result', result);
  };

  return (
    <div className="p-10">
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
