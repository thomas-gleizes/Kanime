import React, { useEffect, useState } from 'react';

import { Page } from 'next/app';

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

interface Props1 extends ModalProps {
  content: string;
}

interface Props2 extends ModalProps {
  value: string;
}

const Modal1: Component<Props1> = ({ isOpen, close, content }) => {
  const dialog = useDialog();

  const handleClick = () => {
    console.log('click');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close.bind({ action: 'cancel' })}
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

const Modal2: Component<Props2> = ({ isOpen, close, value }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={close.bind({ action: 'cancel' })}
      motionPreset="slideInBottom"
      isCentered
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h1>{value}</h1>
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

const DevPage: Page = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog.custom<Props1, any>(Modal1, { content: 'ojk' });
  };

  return (
    <div className="p-10">
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
