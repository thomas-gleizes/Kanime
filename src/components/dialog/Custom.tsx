import { useMemo } from 'react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';
import Modal from 'components/layouts/Modal';

const CustomDialog: Component = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const isOpen = useMemo<boolean>(
    () => dialog.type === dialogTypes.custom,
    [dialog.type]
  );

  const handleClose = (result: any) => {
    dialog.resolve(result);
    setDialog({ type: null, content: null, resolve: null });
  };

  return (
    <Modal isOpen={isOpen} toggle={() => handleClose(null)}>
      {isOpen && dialog.content && (
        <dialog.content.component close={handleClose} {...dialog.content.props} />
      )}
    </Modal>
  );
};

export default CustomDialog;
